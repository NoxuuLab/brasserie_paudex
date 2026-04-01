<?php
// Sécurité : vérifier que la requête vient bien du formulaire
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: reservation.html');
    exit;
}

// Récupérer et nettoyer les données
function clean($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$prenom    = clean($_POST['prenom'] ?? '');
$nom       = clean($_POST['nom'] ?? '');
$email     = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$telephone = clean($_POST['telephone'] ?? '');
$date      = clean($_POST['date'] ?? '');
$heure     = clean($_POST['heure'] ?? '');
$personnes = clean($_POST['personnes'] ?? '');
$service   = clean($_POST['service'] ?? '');
$message   = clean($_POST['message'] ?? '');

// Vérifications de base
if (empty($prenom) || empty($nom) || empty($email) || empty($telephone) || empty($date) || empty($heure) || empty($personnes)) {
    header('Location: reservation.html?erreur=champs-manquants');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: reservation.html?erreur=email-invalide');
    exit;
}

// Destinataire
$to      = 'info@brasseriepaudex.ch';
$subject = "Nouvelle réservation — {$prenom} {$nom} — {$date} à {$heure}";

// Corps de l'email
$body = "
=== NOUVELLE DEMANDE DE RÉSERVATION ===

Nom complet  : {$prenom} {$nom}
Email        : {$email}
Téléphone    : {$telephone}

Date         : {$date}
Heure        : {$heure}
Service      : {$service}
Personnes    : {$personnes}

Demandes spéciales :
{$message}

========================================
Message envoyé depuis brasseriepaudex.ch
";

// En-têtes email
$headers  = "From: no-reply@brasseriepaudex.ch\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    // Email de confirmation au client
    $subject_client = "Votre demande de réservation — Brasserie de Paudex";

    // Fermeture de Pâques du 3 au 6 avril 2026
    $today        = new DateTime('now', new DateTimeZone('Europe/Zurich'));
    $closureStart = new DateTime('2026-04-03', new DateTimeZone('Europe/Zurich'));
    $closureEnd   = new DateTime('2026-04-06 23:59:59', new DateTimeZone('Europe/Zurich'));
    $isClosure    = ($today >= $closureStart && $today <= $closureEnd);

    if ($isClosure) {
        $body_client = "
Bonjour,

Merci pour votre message !

On a décidé de laisser refroidir les pianos et de ranger les tabliers pour quelques jours. Le restaurant sera fermé du 3 au 6 avril inclus.

L'équipe est partie chercher l'inspiration (et un peu de repos) loin des casseroles. On sera de retour, frais et dispos, le mardi 7 avril.

On revient le 7 avril avec le sourire et une carte prête à être dégustée. Si vous écrivez pour une réservation, on traitera votre demande par ordre d'arrivée dès notre retour.

Merci de votre patience et à mardi !

---
Brasserie de Paudex
Route du Simplon 7, 1094 Paudex
+41 21 907 81 50
info@brasseriepaudex.ch
";
    } else {
        $body_client = "
Bonjour {$prenom},

Nous avons bien reçu votre demande de réservation pour le {$date} à {$heure} ({$personnes} personne(s)).

Nous vous confirmons votre table par email ou par téléphone dans les plus brefs délais (sous 24h).

En cas d'urgence, vous pouvez nous appeler directement au +41 21 907 81 50.

À très bientôt à la Brasserie de Paudex !

---
Brasserie de Paudex
Route du Simplon 7, 1094 Paudex
+41 21 907 81 50
info@brasseriepaudex.ch
";
    }
    $headers_client  = "From: info@brasseriepaudex.ch\r\n";
    $headers_client .= "Content-Type: text/plain; charset=UTF-8\r\n";
    mail($email, $subject_client, $body_client, $headers_client);

    header('Location: reservation.html?confirmation=ok');
    exit;
} else {
    header('Location: reservation.html?erreur=envoi-echoue');
    exit;
}
?>
