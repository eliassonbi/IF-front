/*!
* General javascript globalize v1.0
* ========================================================================
* language file common to all javascripts
* 
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
	var dt = {
			"fr": {
					"sProcessing" : "En cours...",
					"sZeroRecords" : "Pas de résultat",
					"sInfoPostFix" : "",
					"sList" : "Lister sur :",
					"sSearchTitle" : "",
					"sSearch" : "Rechercher :",
					"sFilter" : "Filtrer sur :",
					"sFilterAll" : "Tout", 
					"sUrl" : "",
					"sInfoFiltered" : "sur _MAX_",
					"oAria": {
						"sSortAscending": " - Trier par ordre croissant",
						"sSortDescending": " - Trier par ordre décroissant"
					},
					"oPaginate" : {
						"sFirst" :    "Première page",
						"sPrevious" : "Page précédente",
						"sNext" :     "Page suivante",
						"sLast" :     "Dernière page",
						"sMore" :     "Afficher plus..."
					},
					"sortAscAltText" :"Trier par ordre croissant",
					"sortDescAltText" :"Trier par ordre décroissant",
					"selectTip": "sélectionner tout",
					"unselectTip": "déselectionner tout"            
			},
			"en": {
					"sProcessing" : "In process...",
					"sZeroRecords" : "No result",
					"sInfoPostFix" : "",
					"sList" : "List on:",
					"sSearchTitle" : "",
					"sSearch" : "Search:",
					"sFilter" : "Filter on:",
					"sFilterAll" : "All", 
					"sUrl" : "",
					"sInfoFiltered" : "on _MAX_",
					"oAria": {
						"sSortAscending": " - Sort in ascending order",
						"sSortDescending": " - Sort in descending order"
					},
					"oPaginate" : {
						"sFirst" :    "First page",
						"sPrevious" : "Previous page",
						"sNext" :     "Next page",
						"sLast" :     "Last page",
						"sMore" :     "Show more..."
					},
					"sortAscAltText" :"Sort in ascending order",
					"sortDescAltText" :"Sort in descending order",
					"selectTip": "select all",
					"unselectTip": "deselect all"            
			},
			"de": {
					"sProcessing" : "Wird bearbeitet...",
					"sZeroRecords" : "Kein Ergebnis",
					"sInfoPostFix" : "",
					"sList" : "Anzeigen auf:",
					"sSearchTitle" : "",
					"sSearch" : "Suchen:",
					"sFilter" : "Filtern nach:",
					"sFilterAll" : "Alles", 
					"sUrl" : "",
					"sInfoFiltered" : "nach _MAX_",
					"oAria": {
						"sSortAscending": " - In aufsteigender Reihenfolge",
						"sSortDescending": " - In absteigender Reihenfolge"
					},
					"oPaginate" : {
						"sFirst" :    "Erste Seite",
						"sPrevious" : "Vorherige Seite",
						"sNext" :     "Nächste Seite",
						"sLast" :     "Letzte Seite",
						"sMore" :     "Mehr anzeigen..."
					},
					"sortAscAltText" :"In aufsteigender Reihenfolge",
					"sortDescAltText" :"In absteigender Reihenfolge",
					"selectTip": "alles auswählen",
					"unselectTip": "alles abwählen"            
			}
		};
		
	
	var dtFiles = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Démarches par page _MENU_',
					"sInfo" : ($('.gu-files-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ démarche</strong>" : "<strong>_TOTAL_ démarches</strong>",
					"sInfoEmpty" : "<strong>0 démarche</strong>",
					"sEmptyTable" : "Aucune démarche"
			},
			"en": {
					"sLengthMenu" : 'Procedures per page _MENU_',
					"sInfo" : ($('.gu-files-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ procedure</strong>" : "<strong>_TOTAL_ procedures</strong>",
					"sInfoEmpty" : "<strong>0 procedure</strong>",
					"sEmptyTable" : "No procedure"
			},
			"de": {
					"sLengthMenu" : 'Vorgänge pro Seite _MENU_',
					"sInfo" : ($('.gu-files-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Vorgang</strong>" : "<strong>_TOTAL_ Vorgänge</strong>",
					"sInfoEmpty" : "<strong>0 Vorgänge</strong>",
					"sEmptyTable" : "Kein Vorgang"
			}
		},dt);
		
	var dtServices = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Démarches par page _MENU_',
					"sInfo" : ($('.gu-services-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ démarche</strong>" : "<strong>_TOTAL_ démarches</strong>",
					"sInfoEmpty" : "<strong>0 démarche</strong>",
					"sEmptyTable" : "Aucune démarche"
			},
			"en": {
					"sLengthMenu" : 'Procedures per page _MENU_',
					"sInfo" : ($('.gu-services-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ procedure</strong>" : "<strong>_TOTAL_ procedures</strong>",
					"sInfoEmpty" : "<strong>0 procedure</strong>",
					"sEmptyTable" : "No procedure"
			},
			"de": {
					"sLengthMenu" : 'Vorgänge pro Seite _MENU_',
					"sInfo" : ($('.gu-services-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Vorgang</strong>" : "<strong>_TOTAL_ Vorgänge</strong>",
					"sInfoEmpty" : "<strong>0 Vorgänge</strong>",
					"sEmptyTable" : "Kein Vorgang"
			}
		},dt);
		
	var dtDocuments = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Documents par page _MENU_',
					"sInfo" : ($('.gu-documents-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ document</strong>" : "<strong>_TOTAL_ documents</strong>",
					"sInfoEmpty" : "<strong>0 document</strong>",
					"sEmptyTable" : "Aucun document"
			},
			"en": {
					"sLengthMenu" : 'Documents per page _MENU_',
					"sInfo" : ($('.gu-documents-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ document</strong>" : "<strong>_TOTAL_ documents</strong>",
					"sInfoEmpty" : "<strong>0 document</strong>",
					"sEmptyTable" : "No document"
			},
			"de": {
					"sLengthMenu" : 'Dokumente pro Seite _MENU_',
					"sInfo" : ($('.gu-documents-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Dokument</strong>" : "<strong>_TOTAL_ Dokumente</strong>",
					"sInfoEmpty" : "<strong>0 Dokumente</strong>",
					"sEmptyTable" : "Kein Dokument"
			}
		},dt);
	
	var dtAnnexes = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Annexes par page _MENU_',
					"sInfo" : ($('.gu-annexes-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ annexe</strong>" : "<strong>_TOTAL_ annexes</strong>",
					"sInfoEmpty" : "<strong>0 annexe</strong>",
					"sEmptyTable" : "Aucune annexe"
			},
			"en": {
					"sLengthMenu" : 'Annexes per page _MENU_',
					"sInfo" : ($('.gu-annexes-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ annexe</strong>" : "<strong>_TOTAL_ annexes</strong>",
					"sInfoEmpty" : "<strong>0 annex</strong>",
					"sEmptyTable" : "No annex"
			},
			"de": {
					"sLengthMenu" : 'Anlagen pro Seite _MENU_',
					"sInfo" : ($('.gu-annexes-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Anlage</strong>" : "<strong>_TOTAL_ Anlagen</strong>",
					"sInfoEmpty" : "<strong>0 Anlagen</strong>",
					"sEmptyTable" : "Keine Anlage"
			}
	},dt);
	
	var dtEvents = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Evènements par page _MENU_',
					"sInfo" : ($('.gu-file-events-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ évènement</strong>" : "<strong>_TOTAL_ évènements</strong>",
					"sInfoEmpty" : "<strong>0 évènement</strong>",
					"sEmptyTable" : "Aucun évènement"
			},
			"en": {
					"sLengthMenu" : 'Events per page _MENU_',
					"sInfo" : ($('.gu-file-events-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ event</strong>" : "<strong>_TOTAL_ events</strong>",
					"sInfoEmpty" : "<strong>0 event</strong>",
					"sEmptyTable" : "No event"
			},
			"de": {
					"sLengthMenu" : 'Ereignisse pro Seite _MENU_',
					"sInfo" : ($('.gu-file-events-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Ereignis</strong>" : "<strong>_TOTAL_ Ereignisse</strong>",
					"sInfoEmpty" : "<strong>0 Ereignisse</strong>",
					"sEmptyTable" : "Kein Ereignis"
			}
		},dt);
	
	var dtActors = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Acteurs par page _MENU_',
					"sInfo" : ($('.gu-file-actors-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ acteur</strong>" : "<strong>_TOTAL_ acteurs</strong>",
					"sInfoEmpty" : "<strong>0 acteur</strong>",
					"sEmptyTable" : "Aucun acteur"
			},
			"en": {
					"sLengthMenu" : 'Participants per page _MENU_',
					"sInfo" : ($('.gu-file-actors-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ participant</strong>" : "<strong>_TOTAL_ participants</strong>",
					"sInfoEmpty" : "<strong>0 participant</strong>",
					"sEmptyTable" : "No participant"
			},
			"de": {
					"sLengthMenu" : 'Akteure pro Seite _MENU_',
					"sInfo" : ($('.gu-file-actors-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Akteur</strong>" : "<strong>_TOTAL_ Akteure</strong>",
					"sInfoEmpty" : "<strong>0 Akteuere</strong>",
					"sEmptyTable" : "Kein Akteur"
			}
		},dt);
		
	var dtAdmins = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Organismes par page _MENU_',
					"sInfo" : ($('.gu-file-admins-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ organisme</strong>" : "<strong>_TOTAL_ organismes</strong>",
					"sInfoEmpty" : "<strong>0 organisme</strong>",
					"sEmptyTable" : "Aucun organisme"
				},
			"en": {
					"sLengthMenu" : 'Administrations per page _MENU_',
					"sInfo" : ($('.gu-file-admins-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ administration</strong>" : "<strong>_TOTAL_ administrations</strong>",
					"sInfoEmpty" : "<strong>0 administration</strong>",
					"sEmptyTable" : "No administration"
				},
			"de": {
					"sLengthMenu" : 'Behörden pro Seite _MENU_',
					"sInfo" : ($('.gu-file-admins-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Behörde</strong>" : "<strong>_TOTAL_ Behörden</strong>",
					"sInfoEmpty" : "<strong>0 Behörde</strong>",
					"sEmptyTable" : "Keine Behörde"
				}
		},dt);
	
	var dtMessages = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Messages par page _MENU_',
					"sInfo" : ($('.gu-file-messages-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ message</strong>" : "<strong>_TOTAL_ messages</strong>",
					"sInfoEmpty" : "<strong>0 message</strong>",
					"sEmptyTable" : "Aucun message"
			},
			"en": {
					"sLengthMenu" : 'Messages per page _MENU_',
					"sInfo" : ($('.gu-file-messages-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ message</strong>" : "<strong>_TOTAL_ messages</strong>",
					"sInfoEmpty" : "<strong>0 message</strong>",
					"sEmptyTable" : "No message"
			},
			"de": {
					"sLengthMenu" : 'Nachrichten pro Seite _MENU_',
					"sInfo" : ($('.gu-file-messages-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Nachricht</strong>" : "<strong>_TOTAL_ Nachrichten</strong>",
					"sInfoEmpty" : "<strong>0 Nachrichten</strong>",
					"sEmptyTable" : "Keine Nachricht"
			}
		},dt);
		
	var dtCollaborators = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Utilisateurs par page _MENU_',
					"sInfo" : ($('.gu-collaborators-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ utilisateur</strong>" : "<strong>_TOTAL_ utilisateurs</strong>",
					"sInfoEmpty" : "<strong>0 utilisateur</strong>",
					"sEmptyTable" : "Aucun utilisateur"
			},
			"en": {
					"sLengthMenu" : 'Users per page _MENU_',
					"sInfo" : ($('.gu-collaborators-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ user</strong>" : "<strong>_TOTAL_ users</strong>",
					"sInfoEmpty" : "<strong>0 user</strong>",
					"sEmptyTable" : "No user"
			},
			"de": {
					"sLengthMenu" : 'Benutzer pro Seite _MENU_',
					"sInfo" : ($('.gu-collaborators-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Benutzer</strong>" : "<strong>_TOTAL_ Benutzer</strong>",
					"sInfoEmpty" : "<strong>0 Benutzer</strong>",
					"sEmptyTable" : "Kein Benutzer"
			}
		},dt);
		
	var dtRoles = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Rôles par page _MENU_',
					"sInfo" : ($('.gu-roles-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ rôle</strong>" : "<strong>_TOTAL_ rôles</strong>",
					"sInfoEmpty" : "<strong>0 rôle</strong>",
					"sEmptyTable" : "Aucun rôle"
			},
			"en": {
					"sLengthMenu" : 'Tasks per page _MENU_',
					"sInfo" : ($('.gu-roles-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ task</strong>" : "<strong>_TOTAL_ tasks</strong>",
					"sInfoEmpty" : "<strong>0 task</strong>",
					"sEmptyTable" : "No task"
			},
			"de": {
					"sLengthMenu" : 'Rollen pro Seite _MENU_',
					"sInfo" : ($('.gu-roles-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Rolle</strong>" : "<strong>_TOTAL_ Rollen</strong>",
					"sInfoEmpty" : "<strong>0 Rollen</strong>",
					"sEmptyTable" : "Keine Rolle"
			}
		},dt);
		
	var dtRight = $.extend(true,{
			"fr": {
					"sLengthMenu" : 'Droits par page _MENU_',
					"sInfo" : ($('.gu-rights-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ droit</strong>" : "<strong>_TOTAL_ droits</strong>",
					"sInfoEmpty" : "<strong>0 droit</strong>",
					"sEmptyTable" : "Aucun droit"
			},
			"en": {
					"sLengthMenu" : 'Rights per page _MENU_',
					"sInfo" : ($('.gu-rights-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ right</strong>" : "<strong>_TOTAL_ rights</strong>",
					"sInfoEmpty" : "<strong>0 right</strong>",
					"sEmptyTable" : "No right"
			},
			"de": {
					"sLengthMenu" : 'Rechte pro Seite _MENU_',
					"sInfo" : ($('.gu-rights-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Recht</strong>" : "<strong>_TOTAL_ Rechte</strong>",
					"sInfoEmpty" : "<strong>0 Rechte</strong>",
					"sEmptyTable" : "Kein Recht"
			}
		},dt);
	
	var dtSpace = $.extend(true,{
		"fr": {
				"sLengthMenu" : 'Espaces par page _MENU_',
				"sInfo" : ($('.gu-spaces-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ espace</strong>" : "<strong>_TOTAL_ espaces</strong>",
				"sInfoEmpty" : "<strong>0 espace</strong>",
				"sEmptyTable" : "Aucun espace"
		},
		"en": {
				"sLengthMenu" : 'Spaces per page _MENU_',
				"sInfo" : ($('.gu-rights-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ space</strong>" : "<strong>_TOTAL_ spaces</strong>",
				"sInfoEmpty" : "<strong>0 space</strong>",
				"sEmptyTable" : "No space"
		},
		"de": {
				"sLengthMenu" : 'Bereiche pro Seite _MENU_',
				"sInfo" : ($('.gu-rights-tab > tbody > tr').length == 1) ? "<strong>_TOTAL_ Bereich</strong>" : "<strong>_TOTAL_ Bereiche</strong>",
				"sInfoEmpty" : "<strong>0 Bereich</strong>",
				"sEmptyTable" : "Kein Bereich"
		}
	},dt);
	
	var dtChildren = $.extend(true,{
			"fr": {
					"sEmptyTable" : "Aucun enfant"
				},
			"en": {
					"sEmptyTable" : "No children"
				},
			"de": {
					"sEmptyTable" : "Kein Kind"
				}
		},dt);
	
	var dtDefault = $.extend(true,{
			"fr": {
					"sEmptyTable" : "Aucune donnée saisie"
				},
			"en": {
					"sEmptyTable" : "No data entered"
				},
			"de": {
					"sEmptyTable" : "Keine Angabe gemacht"
				}
		},dt);
	
	

var culture = Globalize.findClosestCulture( Globalize.cultureSelector );

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableFiles : dtFiles[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableServices : dtServices[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableDocuments : dtDocuments[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableAnnexes : dtAnnexes[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableEvents : dtEvents[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableActors : dtActors[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableActors : dtActors[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableAdmins : dtAdmins[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableMessages : dtMessages[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableCollaborators : dtCollaborators[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableRoles : dtRoles[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableRight : dtRight[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableChildren : dtChildren[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableDefault : dtDefault[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableCol : dt[ culture.name ]
	}
});

Globalize.addCultureInfo( culture.name, {
	messages : {
		dataTableSpace : dtSpace[ culture.name ]
	}
});
