Ext.define('Admin.view.frontoffice.survelliance.grids.PMSProductVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'pmsproductvisiblecolumns',
    title: 'PMS Product And Region',
    titleCollapse: true,
    scroll: true,
        margin: 2,
        collapsible: true,
        autoScroll: true,
        defaults: {
            xtype: 'checkbox',
            labelAlign: 'right',
            margin: 5,
            labelSeparator: ':',
            hideLabel: true
        },
    items: [{
            boxLabel: 'Product Name',
            name: 30,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'PMS Region',
            name: 31,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'PMS District',
            name: 32,
            hidden: true,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Name',
            name: 33,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }
        //site level
        ,{
            boxLabel: 'Site Level',
            name: 60,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }
        ,{
            boxLabel: 'Sampling Site Category',
            name: 34,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Email',
            name: 35,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Country',
            name: 36,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Region',
            name: 37,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site District',
            name: 38,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Email Address',
            name: 39,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Postal Address',
            name: 40,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Physical Address',
            name: 41,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Telephone No',
            name: 42,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Fax',
            name: 43,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Website',
            name: 44,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Street',
            name:45,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }]

    });