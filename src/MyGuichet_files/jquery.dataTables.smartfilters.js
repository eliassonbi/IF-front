/*!
* jquery.datatables.smartfilters.js v0.0.1
* ========================================================================
* Add a server-side filtering mechanism to datatables
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

/* Smart filters */
var SmartFilters;

( function( $, document, window, undefined ) {

htmlDecode = function(value)
{
    return $('<div />').html(value).text();
};
	
/** 
 * SmartFilters provides an abstract filtering mechanism
 * @class SmartFilters
 * @constructor
 * @param {Array}    oOpts.aButtons List of buttons to be used
 * @param {Function} oOpts.fnOnFilterSelected Callback function just after row selection
 */
SmartFilters = function( oDT, oOpts )
{
    /* Santiy check that we are a new instance */
    if ( ! this instanceof SmartFilters )
    {
        alert( "Warning: SmartFilters must be initialised with the keyword 'new'" );
    }
    
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Public class variables
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * @namespace Settings object which contains customisable information for SmartFilters instance
     */
    this.s = {
        that: this,
        dt: oDT,
        buttonCounter: 0,
        custom: {},
        buttonSet: [],
        tags: {}
    };

    /**
     * @namespace Common and useful DOM elements for the class instance
     */
    this.dom = {
        container: null,
        table: null,
        collection: {
            container: null
        }
    };
    
    this.urlParams = {};

    /**
     * @namespace Name space for the classes that this SmartFilters instance will use
     * @extends SmartFilters.classes
     */
    this.classes = $.extend( true, {}, SmartFilters.classes );

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Public class methods
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    
    /**
     * Retrieve the settings object from an instance
     *  @method fnSettings
     *  @returns {object} SmartFilters settings object
     */
    this.fnSettings = function () {
        return this.s;
    };

    this._fnConstruct( oOpts || {} );

    return this;
};

SmartFilters.prototype = {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	/**
	 * Add URL parameters to the default query string before submit
     *  @param  {Object} oParams A list of name-value pairs for each parameter
	 */
	"fnAddUrlParameters": function ( oParams )
	{
        $.extend( this.urlParams, oParams );
	},

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Private methods
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Constructor logic
     *  @method  _fnConstruct
     *  @param   {Object} oOpts Same as SmartFilters constructor
     *  @returns void
     *  @private 
     */
    "_fnConstruct": function ( oOpts )
    {
        var that = this;
        
        this._fnCustomiseSettings( oOpts );
        
        /* Container element */
        this.dom.container = document.createElement( this.s.tags.container );
        this.dom.container.className = this.classes.container;

        /* Buttons */
        this._fnButtonDefinations( this.s.buttonSet, this.dom.container );
        
        if( typeof this.s.custom.sInitialFilter != 'undefined' )
        {
            $( this.s.tags.button + '[data-filter="' + this.s.custom.sInitialFilter + '"]', this.dom.container ).click();
        }
        
        /* Destructor - need to wipe the DOM for IE's garbage collector */
        this.s.dt.fnSettings().aoDestroyCallback.push( {
            sName: "SmartFilters",
            fn: function () {
                that.dom.container.innerHTML = "";
            }
        } );
    },

    /**
     * Take the user defined settings and the default settings and combine them.
     *  @method  _fnCustomiseSettings
     *  @param   {Object} oOpts Same as SmartFilters constructor
     *  @returns void
     *  @private 
     */
    "_fnCustomiseSettings": function ( oOpts )
    {
        /* Clone the defaults and then the user options */
        this.s.custom = $.extend( {}, SmartFilters.DEFAULTS, oOpts );
        
        this.s.tags = this.s.custom.oTags;

        /* Button set */
        this.s.buttonSet = this.s.custom.aButtons;
    },

    /**
     * Take the user input arrays and expand them to be fully defined, and then add them to a given
     * DOM element
     *  @method  _fnButtonDefinations
     *  @param {array} buttonSet Set of user defined buttons
     *  @param {node} wrapper Node to add the created buttons to
     *  @returns void
     *  @private 
     */
    "_fnButtonDefinations": function ( buttonSet, wrapper )
    {
        var that = this;
        
        for ( idx in buttonSet )
        {
            if( typeof buttonSet[idx] == "string" ) 
            {
                wrapper.appendChild( this._fnCreateButton( 
                    idx,
                    buttonSet[idx],
                    false
                ) );
            }
            else
            {
                wrapper.appendChild( this._fnCreateCollection(
                    idx,
                    buttonSet[idx]
                ) );
            }
        }
        
        $( wrapper ).on( 'click', this.s.tags.button + ':not(.has-more)', function(e) {
            $( wrapper ).find( '.DTSM_selected' ).removeClass( 'DTSM_selected' );
            $( this ).addClass( 'DTSM_selected' );
            
            that.s.dt.fnDraw();
            
            return false;
        } );
    },
    
    /**
     * Create and configure a SmartFilters button
     *  @method  _fnCreateButton
     *  @param   {String} sFilterValue The value that must be sent to the server for filtering
     *  @param   {String} sFilterLabel The label used on the button
     *  @returns {Node} Button element
     *  @private 
     */
    "_fnCreateButton": function ( sFilterValue, sFilterLabel, bCollectionButton )
    {
        var sTag, sContainerTag, sClass;

        if ( bCollectionButton )
        {
            sTag = this.s.tags.collection.button;
            sContainerTag = this.s.tags.collection.buttonContainer;
            sClass = this.classes.collection.buttons.normal;
        }
        else
        {
            sTag = this.s.tags.button;
            sContainerTag = this.s.tags.buttonContainer;
            sClass = this.classes.buttons.normal;
        }

        var
          nButton = document.createElement( sTag ),
          nButtonContainer = document.createElement( sContainerTag );
        
        //nButton.className = sClass+" "+o.sButtonClass;
        nButton.setAttribute('id', "SmartFilters_"+this.s.buttonCounter );
        nButton.setAttribute('title', htmlDecode(sFilterLabel));
        nButton.innerHTML = sFilterLabel;
        nButton.className = sClass;
        if( sFilterValue == 'all' )
            nButton.className += ' DTSM_selected';
        if( sTag == 'a' ) nButton.setAttribute('href', '#');
        if( 'dataset' in nButton )
            nButton.dataset.filter = sFilterValue;
        else
            nButton.setAttribute('data-filter', sFilterValue);

        nButtonContainer.appendChild( nButton );
        
        this.s.buttonCounter++;
        
        return nButtonContainer;
    },
    
    /**
     * Create and configure a SmartFilters collection of buttons
     *  @method  _fnCreateButton
     *  @param   {String} sFilterValue The value that must be sent to the server for filtering
     *  @param   {String} sFilterLabel The label used on the button
     *  @returns {Node} Button element
     *  @private 
     */
    "_fnCreateCollection": function ( sCollectionLabel, aCollection )
    {
        var sTag, sContainerTag, sClass;
        
        sTag = this.s.tags.buttonContainer;
        sContainerTag = this.s.tags.collection.container;
        sClass = this.classes.collection.container;
        
        var 
            nHolder = document.createElement( sTag ),
            nMore = document.createElement( 'a' ),
            nContainer = document.createElement( sContainerTag );

        for ( sFilterValue in aCollection )
        {
            if( sFilterValue == '_label' ) continue;
            
            var sFilterLabel = aCollection[ sFilterValue ];

            nContainer.appendChild( this._fnCreateButton( 
                sFilterValue,
                sFilterLabel,
                true
            ) );
        }
        
        nMore.setAttribute( 'href', '#' );
        nMore.className = 'has-more';
        nMore.innerHTML = aCollection['_label'];
        
        nContainer.className = sClass;
        nHolder.appendChild( nMore );
        nHolder.appendChild( nContainer );
        $( nHolder ).on( 'click', '.has-more', function() {
            $( nHolder ).toggleClass( 'DTSM_active' );
            return false;
        }).on( 'click', 'a:not(.has-more)', function() {
            $( nHolder ).removeClass( 'DTSM_active' );
        });
        
        $( 'body' ).on( 'click', function() {
            $( nHolder ).removeClass( 'DTSM_active' );
        } );
        
        return nHolder;
    }
}


/**
 * @namespace Classes used by SmartFilters - allows the styles to be overriden easily.
 *   Note that when SmartFilters initialises it will take a copy of the classes object
 *   and will use its internal copy for the remainder of its run time.
 */
SmartFilters.classes = {
    container: 'DTSM_container',
    buttons: {
        normal: 'DTSM_button'
    },
    collection: {
        container: 'DTSM_collection',
        buttons: {
            normal: 'DTSM_subbutton'
        }
    }
};
    
    
/**
 * @namespace SmartFilters default settings for initialisation
 */
SmartFilters.DEFAULTS = {
	"aButtons":         null,
    "sFilterURL":       null,
    "sFilterParameter": 'filter',
    "fnPreFilter":      null,
	"oTags": {
		container: "ul",
        buttonContainer: "li",
		button: "a",
		collection: {
			container: "ul",
            buttonContainer: "li",
			button: "a"
		}
	}
};


/**
 * Name of this class
 *  @constant CLASS
 *  @type	 String
 *  @default  SmartFilters
 */
SmartFilters.prototype.CLASS = "SmartFilters";


/**
 * SmartFilters version
 *  @constant  VERSION
 *  @type	  String
 *  @default   See code
 */
SmartFilters.VERSION = "0.0.1";
SmartFilters.prototype.VERSION = SmartFilters.VERSION;




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
 * Register a new feature with DataTables
 */
if ( typeof $.fn.dataTable == "function" &&
	 typeof $.fn.dataTableExt.fnVersionCheck == "function" &&
	 $.fn.dataTableExt.fnVersionCheck('1.9.0') )
{
    $.fn.dataTableExt.afnFiltering.push( function( oSettings, aData, iDataIndex ) 
    {
        var nRow = oSettings.aoData[iDataIndex].nTr,
            nSelected = $( '.DTSM_container .DTSM_selected', oSettings.nTableWrapper );
            
        return nSelected.size() == 0 || nSelected.data( 'filter' ) == 'all' || $( nRow ).hasClass( nSelected.data( 'filter' ) ) 
    } );

	$.fn.dataTableExt.aoFeatures.push( {
		"fnInit": function( oDTSettings ) {
			var oOpts = oDTSettings.oInit.oSmartFilters || {};
			
			var oSM = new SmartFilters( oDTSettings.oInstance, oOpts );
			
			return oSM.dom.container;
		},
		"cFeature": "S",
		"sFeature": "SmartFilters"
	} );
}
else
{
	//alert( "Warning: SmartFilters requires DataTables 1.9.0 or newer - www.datatables.net/download");
}


$.fn.DataTable.SmartFilters = SmartFilters;

} )( jQuery, document, window );