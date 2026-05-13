import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "fr" | "en";

type Dict = Record<string, string>;

const fr: Dict = {
	"common.loading": "Chargement...",
	"common.back": "Retour",
	"common.total": "Total",
	"common.subtotal": "Sous-total :",
	"common.options": "Options",
	"common.base_price_prefix": "Prix de base :",
	"common.base_short": "Base :",
	"common.plus_options": "+ Options :",
	"common.required": "Requis",
	"common.yes": "Oui",
	"common.no": "Non",

	"periodicity.month": "mois",
	"periodicity.months": "mois",
	"periodicity.week": "semaine",
	"periodicity.weeks": "semaines",
	"periodicity.day": "jour",
	"periodicity.days": "jours",
	"periodicity.year": "an",
	"periodicity.years": "ans",

	"lang.switch": "Langue",
	"lang.fr": "Français",
	"lang.en": "English",

	"header.home": "Accueil",
	"header.all_products": "Tous les produits",
	"header.view_full_catalog": "Voir le catalogue complet",
	"header.login": "Connexion",
	"header.theme_light": "Mode clair",
	"header.theme_dark": "Mode sombre",
	"header.cart": "Panier",
	"header.categories": "Catégories",

	"footer.navigation": "Navigation",
	"footer.home": "Accueil",
	"footer.shop": "Boutique",
	"footer.secure_payment": "Paiement sécurisé",
	"footer.secure_payment_desc":
		"Tous les paiements sont traités de manière sécurisée via Tip4Serv.",
	"footer.rights_reserved": "Tous droits réservés.",
	"footer.default_description":
		"La boutique officielle pour vos produits ARK : Survival Ascended. Livraison instantanée sur votre serveur.",

	"hero.badge_fallback": "Livraison instantanée sur votre serveur",
	"hero.welcome_prefix": "Bienvenue sur",
	"hero.title_fallback_1": "Boutique PC/Console",
	"hero.title_fallback_2": "des serveurs ARK FRANCE",
	"hero.cta_explore": "Explorer la boutique",
	"hero.stat_products": "Produits",
	"hero.stat_players": "Joueurs en ligne",
	"hero.stat_delivery": "Livraison",
	"hero.stat_secure": "Sécurisé",
	"hero.description_suffix":
		"Achetez en toute sécurité et recevez vos items instantanément en jeu.",
	"hero.description_fallback":
		"Dinos, kits, rangs VIP et bien plus encore. Achetez en toute sécurité et recevez vos items instantanément en jeu.",

	"home.categories.title": "Parcourir par catégorie",
	"home.categories.subtitle":
		"Trouvez exactement ce dont vous avez besoin pour dominer sur ARK Ascended",
	"home.categories.view_products": "Voir les produits",

	"home.featured.title": "Produits en vedette",
	"home.featured.subtitle":
		"Les meilleurs articles sélectionnés pour améliorer votre expérience de jeu",
	"home.featured.view_all": "Voir tout",

	"home.latest.title": "Derniers produits ajoutés",
	"home.latest.subtitle": "Découvrez nos nouveautés fraîchement arrivées",

	"cart.title": "Panier",
	"cart.items_singular": "article",
	"cart.items_plural": "articles",
	"cart.clear_tooltip": "Vider le panier",
	"cart.empty.title": "Panier vide",
	"cart.empty.description": "Parcourez la boutique et ajoutez des articles.",
	"cart.empty.cta": "Voir la boutique",
	"cart.toast.cleared": "Panier vidé",
	"cart.toast.item_removed": "{name} retiré du panier",
	"cart.toast.item_added": "{name} ajouté au panier",
	"cart.toast.subscription_conflict":
		"Un abonnement est déjà dans le panier. Videz le panier pour ajouter ce produit.",
	"cart.badge.subscription_short": "Abo",
	"cart.badge.one_month": "1 mois",
	"cart.badge.one_period": "1 {period}",
	"cart.badge.multiple_periods": "{num} {period}s",
	"cart.price.base_label": "base",
	"cart.price.options_label": "options",
	"cart.options.hide": "Masquer les options",
	"cart.options.edit": "Modifier les options",
	"cart.checkout_button": "Commander",
	"cart.discount.applied": "appliquée !",
	"cart.discount.unlock": "Débloquez des réductions",
	"cart.discount.remaining_prefix": "Plus que",
	"cart.discount.remaining_suffix": "pour",
	"cart.discount.max_reached": "Réduction max atteinte",

	"crosssell.title": "Vous pourriez aussi aimer",
	"crosssell.add_tooltip": "Ajouter au panier",

	"products.grid.empty_title": "Aucun produit trouvé dans cette catégorie.",
	"products.grid.empty_help": "Essayez de modifier vos filtres ou votre recherche.",

	"products.page.title_all": "Tous les produits",
	"products.page.subtitle_category": "Parcourir les produits de la catégorie {name}",
	"products.page.subtitle_all": "Découvrez notre catalogue complet pour ARK Ascended",
	"products.page.found_singular": "produit trouvé",
	"products.page.found_plural": "produits trouvés",
	"products.page.sidebar_categories": "Catégories",
	"products.page.search_placeholder": "Rechercher un produit...",
	"products.sort.name": "Nom (A-Z)",
	"products.sort.newest": "Plus récents",
	"products.sort.popular": "Populaires",
	"products.sort.price_asc": "Prix croissant",
	"products.sort.price_desc": "Prix décroissant",
	"products.per_page": "{n} par page",
	"products.pagination.prev": "Précédent",
	"products.pagination.next": "Suivant",

	"product.badge.new": "Nouveau",
	"product.badge.subscription_short": "Abo",
	"product.badge.subscription": "Abonnement",
	"product.badge.featured": "En vedette",
	"product.badge.star": "Star",

	"product.not_found.title": "Produit introuvable",
	"product.not_found.description": "Ce produit n'existe pas ou a été retiré de la boutique.",
	"product.back_to_shop": "Retour à la boutique",
	"product.breadcrumb_shop": "Boutique",
	"product.feature.instant": "Instantané",
	"product.feature.auto_delivery": "Livraison auto",
	"product.feature.secure": "Sécurisé",
	"product.feature.protected_payment": "Paiement protégé",
	"product.feature.support_247": "Support continu",
	"product.stock_suffix": "en stock",
	"product.stock.in_stock": "En stock",
	"product.stock.low_stock": "Plus que {qty} en stock",
	"product.stock.out_of_stock": "Rupture de stock",
	"product.stock.remaining": "{qty} restants",
	"product.toast.max_stock": "Quantité maximale disponible : {qty}",
	"product.servers_available": "Serveurs disponibles",
	"product.customize": "Personnaliser",
	"product.buy_one_period": "Acheter 1 {period} -",
	"product.buy_multiple_periods": "Acheter {num} {period}s -",
	"product.subscribe": "S'abonner -",
	"product.subscription_note":
		"L'abonnement se renouvelle automatiquement. Annulable à tout moment.",
	"product.add_to_cart": "Ajouter au panier",
	"product.toast.added_one_period": "{name} ajouté au panier (1 {period})",
	"product.toast.added_subscription": "{name} ajouté au panier (abonnement)",
	"product.toast.replaced_by_subscription": "Panier remplacé par l'abonnement {name}",
	"product.toast.added_qty": "{name} x{qty} ajouté au panier",
	"product.banner.checkout_success":
		"Paiement effectué avec succès ! Votre commande sera livrée automatiquement.",
	"product.banner.checkout_canceled": "Paiement annulé. Vous pouvez réessayer à tout moment.",
	"product.discount_suffix": "% de réduction",

	"custom_fields.stat.hp": "Points de vie du dino",
	"custom_fields.stat.stam": "Endurance du dino",
	"custom_fields.stat.oxy": "Oxygène du dino",
	"custom_fields.stat.food": "Nourriture du dino",
	"custom_fields.stat.poids": "Poids du dino",
	"custom_fields.stat.damage": "Dégâts du dino",
	"custom_fields.stat.degat": "Dégâts de l'objet",
	"custom_fields.stat.dura": "Durabilité de l'objet",
	"custom_fields.rule.reduce_by": "Réduisez de {n} points",
	"custom_fields.rule.remaining_exact": "Il vous reste {n} points à répartir",
	"custom_fields.rule.remaining_range": "{n} points restants (min {min})",
	"custom_fields.option_price_for": "pour cette option",
	"custom_fields.step_label": "pas de {step}",
	"custom_fields.text_placeholder": "Entrez {name}...",

	"countdown.label": "Offre expire dans",
	"countdown.unit_days": "j",
	"countdown.unit_hours": "h",
	"countdown.unit_minutes": "m",
	"countdown.unit_seconds": "s",

	"promo.close_aria": "Fermer la bannière",

	"checkout.toast.accept_terms":
		"Veuillez accepter les conditions relatives au droit de rétractation.",
	"checkout.toast.shop_unavailable": "Impossible de contacter la boutique. Veuillez réessayer.",
	"checkout.toast.field_required": 'Le champ "{label}" est requis.',
	"checkout.toast.rule_exact":
		"{product} - {rule} : la somme doit être exactement {max} (actuellement {total}).",
	"checkout.toast.rule_range":
		"{product} - {rule} : la somme doit être entre {min} et {max} (actuellement {total}).",
	"checkout.toast.generic_error": "Une erreur est survenue. Veuillez réessayer.",
	"checkout.toast.item_removed": "{name} retiré du panier",

	"checkout.redirecting.title": "Redirection vers le paiement",
	"checkout.redirecting.body":
		"Vous allez être redirigé vers la page de paiement sécurisée. Veuillez patienter...",
	"checkout.redirecting.status": "Redirection en cours...",
	"checkout.trust.secure_payment": "Paiement sécurisé",
	"checkout.trust.instant_delivery": "Livraison instantanée",
	"checkout.trust.secure_encrypted": "Paiement sécurisé et chiffré",
	"checkout.trust.auto_instant": "Livraison automatique instantanée",

	"checkout.empty.title": "Votre panier est vide",
	"checkout.empty.description": "Ajoutez des articles depuis la boutique pour passer commande.",
	"checkout.empty.cta": "Voir la boutique",
	"checkout.back": "Retour",
	"checkout.breadcrumb_payment": "Paiement",
	"checkout.title": "Finaliser la commande",
	"checkout.section_cart": "Votre panier",
	"checkout.badge.subscription": "Abonnement",
	"checkout.badge.one_month": "1 mois",
	"checkout.loading_info": "Chargement des informations...",
	"checkout.section_delivery_info": "Informations de livraison",
	"checkout.identifier.email.label": "Email",
	"checkout.identifier.email.placeholder": "exemple@email.com",
	"checkout.identifier.minecraft_username.label": "Pseudo Minecraft",
	"checkout.identifier.minecraft_username.placeholder": "Steve",
	"checkout.identifier.steam_id.label": "Steam ID",
	"checkout.identifier.steam_id.placeholder": "76561198000000000",
	"checkout.identifier.discord_id.label": "Discord ID",
	"checkout.identifier.discord_id.placeholder": "274785054121525250",
	"checkout.identifier.epic_id.label": "Epic Games ID",
	"checkout.identifier.epic_id.placeholder": "Votre ID Epic Games",
	"checkout.identifier.eos_id.label": "EOS ID (Epic Online Services)",
	"checkout.identifier.eos_id.placeholder": "0123456789abcdef...",
	"checkout.identifier.fivem_citizen_id.label": "FiveM Citizen ID",
	"checkout.identifier.fivem_citizen_id.placeholder": "abc123",
	"checkout.identifier.ingame_username.label": "Pseudo en jeu",
	"checkout.identifier.ingame_username.placeholder": "Votre pseudo",
	"checkout.identifier.rust_username.label": "Pseudo Rust",
	"checkout.identifier.rust_username.placeholder": "Votre pseudo Rust",
	"checkout.quantity_label": "Qté :",
	"checkout.summary.title": "Récapitulatif",
	"checkout.summary.promo_note":
		"Les codes promo et cartes cadeaux peuvent être appliqués sur la page de paiement.",
	"checkout.terms.text":
		"Conformément à l'article L221-28 du Code de la consommation, le client renonce à son droit de rétractation dès l'accès au contenu numérique. Aucun remboursement ne sera possible après activation, sauf défaut technique avéré.",
	"checkout.button.redirecting": "Redirection...",
	"checkout.button.pay": "Payer",

	"checkout_success.title": "Paiement confirmé !",
	"checkout_success.subtitle":
		"Merci pour votre achat. Votre commande a été validée avec succès.",
	"checkout_success.delivery.title": "Livraison en cours",
	"checkout_success.delivery.body":
		"Vos articles sont en cours de livraison sur le serveur sur lequel vous êtes connecté. Ils apparaîtront automatiquement dans votre inventaire.",
	"checkout_success.timing.title": "Délai de livraison",
	"checkout_success.timing.body": "Quelques instants après connexion au serveur",
	"checkout_success.security.title": "Transaction sécurisée",
	"checkout_success.security.body": "Votre paiement a été traité en toute sécurité",
	"checkout_success.howto.title": "Comment recevoir vos articles ?",
	"checkout_success.howto.step1":
		"Connectez-vous au serveur de jeu sur lequel vous jouez habituellement.",
	"checkout_success.howto.step2":
		"Vos articles seront automatiquement livrés dans votre inventaire en jeu.",
	"checkout_success.howto.step3":
		"Si vous ne recevez pas vos articles sous quelques minutes, reconnectez-vous au serveur.",
	"checkout_success.back_to_shop": "Retour à la boutique",

	"checkout_canceled.title": "Paiement annulé",
	"checkout_canceled.subtitle":
		"Votre commande n'a pas été finalisée. Aucun montant n'a été débité.",
	"checkout_canceled.no_charge.title": "Aucun prélèvement effectué",
	"checkout_canceled.no_charge.body":
		"Votre moyen de paiement n'a pas été débité. Vous pouvez retenter votre achat à tout moment depuis votre panier.",
	"checkout_canceled.retry.title": "Réessayer",
	"checkout_canceled.retry.body": "Votre panier a été conservé",
	"checkout_canceled.help.title": "Besoin d'aide ?",
	"checkout_canceled.help.body": "Contactez-nous sur Discord",
	"checkout_canceled.reasons.title": "Raisons possibles de l'annulation",
	"checkout_canceled.reasons.manual":
		"Vous avez annulé le paiement manuellement depuis la page de paiement.",
	"checkout_canceled.reasons.declined": "Votre moyen de paiement a été refusé par votre banque.",
	"checkout_canceled.reasons.expired":
		"La session de paiement a expiré après un délai d'inactivité.",
	"checkout_canceled.return_to_cart": "Retourner au panier",
	"checkout_canceled.continue_shopping": "Continuer mes achats",

	"account.loading": "Chargement de votre espace...",
	"account.signin.title": "Accédez à votre espace",
	"account.signin.subtitle":
		"Connectez-vous via Tip4Serv pour consulter vos paiements et gérer vos abonnements.",
	"account.signin.button": "Se connecter avec Tip4Serv",
	"account.breadcrumb.account": "Mon compte",
	"account.title_default": "Mon compte",
	"account.logout": "Se déconnecter",
	"account.tabs.profile": "Profil",
	"account.tabs.payments": "Paiements",
	"account.tabs.subscriptions": "Abonnements",
	"account.profile.section_title": "Informations du profil",
	"account.profile.id": "Identifiant",
	"account.profile.username": "Pseudo",
	"account.profile.email": "E-mail",
	"account.profile.language": "Langue",
	"account.profile.timezone": "Fuseau horaire",
	"account.profile.registered_on": "Inscrit le",
	"account.refresh": "Actualiser",
	"account.payments.loading": "Chargement de l'historique...",
	"account.payments.empty.title": "Aucun paiement",
	"account.payments.empty.description":
		"Vos achats apparaîtront ici dès votre première commande.",
	"account.payments.order_default": "Commande",
	"account.payments.delivered_to": "Livré à :",
	"account.payments.details": "Détails",
	"account.subs.loading": "Chargement des abonnements...",
	"account.subs.empty.title": "Aucun abonnement",
	"account.subs.empty.description": "Vos abonnements actifs apparaîtront ici.",
	"account.subs.price": "Prix",
	"account.subs.cycle": "Cycle",
	"account.subs.cycle_one_time": "Unique",
	"account.subs.start": "Début",
	"account.subs.expires_on": "Expire le",
	"account.subs.next_payment": "Prochain paiement",
	"account.subs.unsubscribe": "Se désabonner",
	"account.subs.confirm_unsubscribe": "Confirmer la résiliation de cet abonnement ?",
	"account.subs.toast_unsubscribed": "Abonnement résilié.",
	"account.subs.toast_error": "Erreur lors de la résiliation",
	"account.error.cant_load": "Impossible de charger",
	"account.status.unknown": "inconnu",

	"checkout.discord_help.button": "Comment trouver mon Discord ID ?",
	"checkout.discord_help.title": "Trouver votre Discord ID",
	"checkout.discord_help.intro":
		"Suivez ces étapes pour récupérer votre identifiant Discord en quelques secondes :",
	"checkout.discord_help.step1":
		"Ouvrez Discord (application ou navigateur), puis cliquez sur l'icône d'engrenage en bas à gauche pour accéder aux Paramètres utilisateur.",
	"checkout.discord_help.step2":
		"Dans la section « Avancés », activez l'option « Mode développeur ».",
	"checkout.discord_help.step3":
		"Fermez les paramètres, faites un clic droit sur votre nom d'utilisateur (ou votre avatar), puis cliquez sur « Copier l'identifiant utilisateur ».",
	"checkout.discord_help.step4":
		"Collez la suite de chiffres dans le champ Discord ID ci-dessous.",
	"checkout.discord_help.tip":
		"Astuce : sur mobile, appuyez longuement sur votre profil après avoir activé le Mode développeur, puis sélectionnez « Copier l'identifiant ».",
	"checkout.discord_help.paste": "Coller depuis le presse-papiers",
	"checkout.discord_help.pasted": "Identifiant Discord collé !",
	"checkout.discord_help.paste_failed":
		"Impossible de lire le presse-papiers. Collez manuellement.",
	"checkout.discord_help.invalid":
		"L'identifiant Discord doit contenir uniquement des chiffres (17 à 20).",
	"checkout.discord_help.close": "Fermer",
	"checkout.discord_help.connect": "Se connecter avec Discord",
	"checkout.discord_help.connecting": "Connexion...",
	"checkout.discord_help.connected": "Identifiant Discord récupéré ({username}) !",
	"checkout.discord_help.connect_failed": "Connexion à Discord impossible : {error}",
	"checkout.discord_help.popup_blocked":
		"Le navigateur a bloqué la fenêtre Discord. Autorisez les pop-ups et réessayez.",
	"checkout.discord_help.not_configured":
		"La connexion Discord n'est pas configurée sur ce site.",
	"checkout.discord_help.or_manual": "Ou récupérez-le manuellement :",
};

const en: Dict = {
	"common.loading": "Looting...",
	"common.back": "Back",
	"common.total": "Total",
	"common.subtotal": "Subtotal:",
	"common.options": "Options",
	"common.base_price_prefix": "Base price:",
	"common.base_short": "Base:",
	"common.plus_options": "+ Options:",
	"common.required": "Required",
	"common.yes": "Yes",
	"common.no": "No",

	"periodicity.month": "month",
	"periodicity.months": "months",
	"periodicity.week": "week",
	"periodicity.weeks": "weeks",
	"periodicity.day": "day",
	"periodicity.days": "days",
	"periodicity.year": "year",
	"periodicity.years": "years",

	"lang.switch": "Language",
	"lang.fr": "Français",
	"lang.en": "English",

	"header.home": "Home",
	"header.all_products": "All products",
	"header.view_full_catalog": "View full catalog",
	"header.login": "Log in",
	"header.theme_light": "Light mode",
	"header.theme_dark": "Dark mode",
	"header.cart": "Loot bag",
	"header.categories": "Categories",

	"footer.navigation": "Navigation",
	"footer.home": "Home",
	"footer.shop": "Shop",
	"footer.secure_payment": "Secure payment",
	"footer.secure_payment_desc":
		"All payments are processed securely via Tip4Serv. Your scrap is safe with us.",
	"footer.rights_reserved": "All rights reserved.",
	"footer.default_description":
		"The official store for SoggyRust. Instant delivery straight to your survivor.",

	"hero.badge_fallback": "Instant delivery!",
	"hero.welcome_prefix": "Welcome to",
	"hero.title_fallback_1": "The Official Store",
	"hero.title_fallback_2": "for SoggyRust",
	"hero.cta_explore": "Start looting",
	"hero.stat_products": "Products",
	"hero.stat_players": "Players online",
	"hero.stat_delivery": "Delivery",
	"hero.stat_secure": "Secure",
	"hero.description_suffix":
		"Pay safely and get your goods instantly in-game. No middlemen, no naked bandits.",
	"hero.description_fallback":
		"Kits, VIP, loot and more. Pay safely and get your gear delivered straight to your hot pocket.",

	"home.categories.title": "Browse by category",
	"home.categories.subtitle": "Find what you need to stop getting wiped every wipe",
	"home.categories.view_products": "View products",

	"home.featured.title": "Featured products",
	"home.featured.subtitle": "The best gear handpicked to help you not get roofcamped",
	"home.featured.view_all": "View all",

	"home.latest.title": "Fresh drops",
	"home.latest.subtitle": "Just added to the loot pool",

	"cart.title": "Your loot bag",
	"cart.items_singular": "item",
	"cart.items_plural": "items",
	"cart.clear_tooltip": "Empty bag",
	"cart.empty.title": "Your bag is empty",
	"cart.empty.description": "Nothing here yet. Go loot the shop.",
	"cart.empty.cta": "Hit the shop",
	"cart.toast.cleared": "Bag emptied. Fresh start.",
	"cart.toast.item_removed": "{name} yeeted from your bag",
	"cart.toast.item_added": "{name} tossed into your bag",
	"cart.toast.subscription_conflict":
		"You've already got a sub in your bag. Clear it out first, then add this one.",
	"cart.badge.subscription_short": "Sub",
	"cart.badge.one_month": "1 month",
	"cart.badge.one_period": "1 {period}",
	"cart.badge.multiple_periods": "{num} {period}s",
	"cart.price.base_label": "base",
	"cart.price.options_label": "options",
	"cart.options.hide": "Hide options",
	"cart.options.edit": "Edit options",
	"cart.checkout_button": "Pay up",
	"cart.discount.applied": "applied!",
	"cart.discount.unlock": "Unlock discounts",
	"cart.discount.remaining_prefix": "Only",
	"cart.discount.remaining_suffix": "more for",
	"cart.discount.max_reached": "Max discount — you're printing money",

	"crosssell.title": "Survivors also grabbed",
	"crosssell.add_tooltip": "Add to bag",

	"products.grid.empty_title": "Nothing here. Did someone raid the shelf?",
	"products.grid.empty_help": "Try tweaking your filters or searching for something else.",

	"products.page.title_all": "All products",
	"products.page.subtitle_category": "Products in the {name} category",
	"products.page.subtitle_all": "The full loot pool — grab what you need",
	"products.page.found_singular": "product found",
	"products.page.found_plural": "products found",
	"products.page.sidebar_categories": "Categories",
	"products.page.search_placeholder": "Search the loot pool...",
	"products.sort.name": "Name (A-Z)",
	"products.sort.newest": "Newest",
	"products.sort.popular": "Most popular",
	"products.sort.price_asc": "Price: cheapest first",
	"products.sort.price_desc": "Price: big spender first",
	"products.per_page": "{n} per page",
	"products.pagination.prev": "Previous",
	"products.pagination.next": "Next",

	"product.badge.new": "New",
	"product.badge.subscription_short": "Sub",
	"product.badge.subscription": "Subscription",
	"product.badge.featured": "Featured",
	"product.badge.star": "Star",

	"product.not_found.title": "This item doesn't exist",
	"product.not_found.description":
		"Someone must have looted it already. This product doesn't exist or was removed.",
	"product.back_to_shop": "Back to shop",
	"product.breadcrumb_shop": "Shop",
	"product.feature.instant": "Instant",
	"product.feature.auto_delivery": "Auto delivery",
	"product.feature.secure": "Secure",
	"product.feature.protected_payment": "Protected payment",
	"product.feature.support_247": "24/7 support",
	"product.stock_suffix": "in stock",
	"product.stock.in_stock": "In stock",
	"product.stock.low_stock": "Almost gone — only {qty} left",
	"product.stock.out_of_stock": "Out of stock",
	"product.stock.remaining": "{qty} remaining",
	"product.toast.max_stock": "You're capped at {qty} — that's all there is",
	"product.servers_available": "Available servers",
	"product.customize": "Customize",
	"product.buy_one_period": "Buy 1 {period} —",
	"product.buy_multiple_periods": "Buy {num} {period}s —",
	"product.subscribe": "Subscribe —",
	"product.subscription_note": "Renews automatically each cycle. Cancel whenever you want.",
	"product.add_to_cart": "Add to bag",
	"product.toast.added_one_period": "{name} added to bag (1 {period})",
	"product.toast.added_subscription": "{name} added to bag (subscription)",
	"product.toast.replaced_by_subscription": "Bag swapped for {name} subscription",
	"product.toast.added_qty": "{name} x{qty} added to bag",
	"product.banner.checkout_success": "Payment went through! Your loot is on its way.",
	"product.banner.checkout_canceled": "Payment bailed. No worries — try again whenever.",
	"product.discount_suffix": "% off",

	"custom_fields.stat.hp": "Dino hit points",
	"custom_fields.stat.stam": "Dino stamina",
	"custom_fields.stat.oxy": "Dino oxygen",
	"custom_fields.stat.food": "Dino food",
	"custom_fields.stat.poids": "Dino weight",
	"custom_fields.stat.damage": "Dino damage",
	"custom_fields.stat.degat": "Item damage",
	"custom_fields.stat.dura": "Item durability",
	"custom_fields.rule.reduce_by": "Reduce by {n} points",
	"custom_fields.rule.remaining_exact": "{n} points left to distribute",
	"custom_fields.rule.remaining_range": "{n} points remaining (min {min})",
	"custom_fields.option_price_for": "for this option",
	"custom_fields.step_label": "step of {step}",
	"custom_fields.text_placeholder": "Enter {name}...",

	"countdown.label": "Deal expires in",
	"countdown.unit_days": "d",
	"countdown.unit_hours": "h",
	"countdown.unit_minutes": "m",
	"countdown.unit_seconds": "s",

	"promo.close_aria": "Close banner",

	"checkout.toast.accept_terms": "You need to accept the terms before checking out.",
	"checkout.toast.shop_unavailable": "Can't reach the shop right now. Try again in a bit.",
	"checkout.toast.field_required": 'The "{label}" field is required — don\'t skip it.',
	"checkout.toast.rule_exact":
		"{product} — {rule}: total must be exactly {max} (you're at {total}).",
	"checkout.toast.rule_range":
		"{product} — {rule}: total must be between {min} and {max} (you're at {total}).",
	"checkout.toast.generic_error": "Something went sideways. Give it another shot.",
	"checkout.toast.item_removed": "{name} dropped from your bag",

	"checkout.redirecting.title": "Heading to payment",
	"checkout.redirecting.body": "You're being bounced to the secure payment page. Hold tight...",
	"checkout.redirecting.status": "Redirecting...",
	"checkout.trust.secure_payment": "Secure payment",
	"checkout.trust.instant_delivery": "Instant delivery",
	"checkout.trust.secure_encrypted": "Encrypted and secure checkout",
	"checkout.trust.auto_instant": "Automatic in-game delivery",

	"checkout.empty.title": "Bag's empty, soldier",
	"checkout.empty.description": "Nothing to pay for. Go pick something from the shop first.",
	"checkout.empty.cta": "Back to the shop",
	"checkout.back": "Back",
	"checkout.breadcrumb_payment": "Payment",
	"checkout.title": "Finish your order",
	"checkout.section_cart": "Your bag",
	"checkout.badge.subscription": "Subscription",
	"checkout.badge.one_month": "1 month",
	"checkout.loading_info": "Loading your info...",
	"checkout.section_delivery_info": "Delivery details",
	"checkout.identifier.email.label": "Email",
	"checkout.identifier.email.placeholder": "example@email.com",
	"checkout.identifier.minecraft_username.label": "Minecraft username",
	"checkout.identifier.minecraft_username.placeholder": "Steve",
	"checkout.identifier.steam_id.label": "Steam ID",
	"checkout.identifier.steam_id.placeholder": "76561198000000000",
	"checkout.identifier.discord_id.label": "Discord ID",
	"checkout.identifier.discord_id.placeholder": "274785054121525250",
	"checkout.identifier.epic_id.label": "Epic Games ID",
	"checkout.identifier.epic_id.placeholder": "Your Epic Games ID",
	"checkout.identifier.eos_id.label": "EOS ID (Epic Online Services)",
	"checkout.identifier.eos_id.placeholder": "0123456789abcdef...",
	"checkout.identifier.fivem_citizen_id.label": "FiveM Citizen ID",
	"checkout.identifier.fivem_citizen_id.placeholder": "abc123",
	"checkout.identifier.ingame_username.label": "In-game username",
	"checkout.identifier.ingame_username.placeholder": "Your in-game name",
	"checkout.identifier.rust_username.label": "Rust username",
	"checkout.identifier.rust_username.placeholder": "Your Rust name",
	"checkout.quantity_label": "Qty:",
	"checkout.summary.title": "Order summary",
	"checkout.summary.promo_note":
		"Got a promo code or gift card? Paste it in on the payment page.",
	"checkout.terms.text":
		"By completing this purchase, you waive your right of withdrawal once the digital content is activated. No refunds after delivery, except for a proven technical issue on our end.",
	"checkout.button.redirecting": "Redirecting...",
	"checkout.button.pay": "Pay now",

	"checkout_success.title": "Payment confirmed!",
	"checkout_success.subtitle":
		"You're good to go. Your order is locked in and delivery is underway.",
	"checkout_success.delivery.title": "Delivery in progress",
	"checkout_success.delivery.body":
		"Your items are being fired at your inventory as we speak. Connect to your server and they'll be waiting for you.",
	"checkout_success.timing.title": "When do I get it?",
	"checkout_success.timing.body": "A few seconds after connecting to the server",
	"checkout_success.security.title": "Safe and sound",
	"checkout_success.security.body": "Your payment was encrypted and processed securely",
	"checkout_success.howto.title": "How to claim your loot",
	"checkout_success.howto.step1": "Jump on the server you usually play on.",
	"checkout_success.howto.step2": "Your items will auto-deliver straight to your inventory.",
	"checkout_success.howto.step3":
		"Not showing up after a minute? Disconnect and reconnect — that usually does the trick.",
	"checkout_success.back_to_shop": "Back to shop",

	"checkout_canceled.title": "Payment canceled",
	"checkout_canceled.subtitle": "Order didn't go through. You weren't charged — no harm done.",
	"checkout_canceled.no_charge.title": "You weren't charged",
	"checkout_canceled.no_charge.body":
		"Your payment method was untouched. Retry whenever you're ready — your bag is still there.",
	"checkout_canceled.retry.title": "Want to try again?",
	"checkout_canceled.retry.body": "Your bag's been saved",
	"checkout_canceled.help.title": "Need a hand?",
	"checkout_canceled.help.body": "Hit us up on Discord",
	"checkout_canceled.reasons.title": "Why did this happen?",
	"checkout_canceled.reasons.manual": "You canceled the payment yourself.",
	"checkout_canceled.reasons.declined": "Your bank blocked the transaction.",
	"checkout_canceled.reasons.expired": "The payment session timed out.",
	"checkout_canceled.return_to_cart": "Back to bag",
	"checkout_canceled.continue_shopping": "Keep shopping",

	"account.loading": "Loading your profile...",
	"account.signin.title": "Access your account",
	"account.signin.subtitle":
		"Sign in with Tip4Serv to view your orders and manage your subscriptions.",
	"account.signin.button": "Sign in with Tip4Serv",
	"account.breadcrumb.account": "My account",
	"account.title_default": "My account",
	"account.logout": "Sign out",
	"account.tabs.profile": "Profile",
	"account.tabs.payments": "Orders",
	"account.tabs.subscriptions": "Subscriptions",
	"account.profile.section_title": "Your profile",
	"account.profile.id": "ID",
	"account.profile.username": "Username",
	"account.profile.email": "Email",
	"account.profile.language": "Language",
	"account.profile.timezone": "Timezone",
	"account.profile.registered_on": "Member since",
	"account.refresh": "Refresh",
	"account.payments.loading": "Fetching your orders...",
	"account.payments.empty.title": "No orders yet",
	"account.payments.empty.description":
		"Nothing here. Place your first order and it'll show up right here.",
	"account.payments.order_default": "Order",
	"account.payments.delivered_to": "Delivered to:",
	"account.payments.details": "Details",
	"account.subs.loading": "Loading subscriptions...",
	"account.subs.empty.title": "No active subscriptions",
	"account.subs.empty.description": "You're not subscribed to anything yet.",
	"account.subs.price": "Price",
	"account.subs.cycle": "Cycle",
	"account.subs.cycle_one_time": "One-time",
	"account.subs.start": "Started",
	"account.subs.expires_on": "Expires on",
	"account.subs.next_payment": "Next charge",
	"account.subs.unsubscribe": "Cancel sub",
	"account.subs.confirm_unsubscribe": "Are you sure you want to cancel this subscription?",
	"account.subs.toast_unsubscribed": "Subscription canceled.",
	"account.subs.toast_error": "Couldn't cancel — try again.",
	"account.error.cant_load": "Couldn't load this",
	"account.status.unknown": "unknown",

	"checkout.discord_help.button": "How do I find my Discord ID?",
	"checkout.discord_help.title": "Find your Discord ID",
	"checkout.discord_help.intro": "It only takes a few seconds — follow these steps:",
	"checkout.discord_help.step1":
		"Open Discord (app or browser) and click the gear icon at the bottom left to open User Settings.",
	"checkout.discord_help.step2": 'Go to the "Advanced" section and flip on "Developer Mode".',
	"checkout.discord_help.step3":
		'Close settings, then right-click your username or avatar and hit "Copy User ID".',
	"checkout.discord_help.step4": "Paste those digits into the Discord ID field below.",
	"checkout.discord_help.tip":
		'On mobile: enable Developer Mode, then long-press your profile and tap "Copy ID".',
	"checkout.discord_help.paste": "Paste from clipboard",
	"checkout.discord_help.pasted": "Discord ID pasted!",
	"checkout.discord_help.paste_failed": "Couldn't read your clipboard. Paste it in manually.",
	"checkout.discord_help.invalid": "Discord IDs are 17–20 digits only.",
	"checkout.discord_help.close": "Close",
	"checkout.discord_help.connect": "Sign in with Discord",
	"checkout.discord_help.connecting": "Connecting...",
	"checkout.discord_help.connected": "Grabbed your Discord ID ({username})!",
	"checkout.discord_help.connect_failed": "Discord login failed: {error}",
	"checkout.discord_help.popup_blocked":
		"Your browser blocked the Discord popup. Allow pop-ups and try again.",
	"checkout.discord_help.not_configured": "Discord login isn't set up on this store.",
	"checkout.discord_help.or_manual": "Or grab it yourself:",
};

const dictionaries: Record<Language, Dict> = { fr, en };

type Ctx = {
	lang: Language;
	setLang: (l: Language) => void;
	t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | undefined>(undefined);

const STORAGE_KEY = "app.language";

function detectInitial(): Language {
	if (typeof window === "undefined") return "fr";
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "fr" || stored === "en") return stored;
	const nav = window.navigator?.language?.toLowerCase() || "";
	if (nav.startsWith("en")) return "en";
	return "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLangState] = useState<Language>(() => detectInitial());

	useEffect(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, lang);
			document.documentElement.lang = lang;
		} catch {
			// ignore
		}
	}, [lang]);

	const setLang = (l: Language) => setLangState(l);

	const t = (key: string, vars?: Record<string, string | number>) => {
		const dict = dictionaries[lang];
		let template = dict[key];
		if (template === undefined) template = dictionaries.fr[key] ?? key;
		if (!vars) return template;
		return template.replace(/\{(\w+)\}/g, (_m, k) => {
			const v = vars[k];
			return v === undefined ? `{${k}}` : String(v);
		});
	};

	return (
		<LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
	return ctx;
}

export function useT() {
	return useLanguage().t;
}
