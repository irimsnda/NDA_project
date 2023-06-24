Ext.define('Admin.view.frontoffice.productnotification.grids.SpreadSheetProductNoteVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'spreadsheetproductnotevisiblecolumns',
    title: 'Select Visibled Columns',
    layout: 'form',
        margin: 2,
        autoScroll: true,
        defaults: {
            xtype: 'checkbox',
            labelAlign: 'right',
            margin: 5,
            labelSeparator: ':',
            hideLabel: true
        },
  items:[  {
            boxLabel: 'Tracking No',
            name: 44,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Reference No',
            name: 45,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Medical Device Name',
            name: 2,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Medical devices Type',
            name: 3,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Classification',
            name: 4,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Common Name',
            name: 5,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Intended use',
            name: 6,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Intended User',
            name: 7,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'GMDN Code',
            name: 8,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'GMDN Term',
            name: 9,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'GMDN Category',
            name: 10,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturing Date',
            name: 11,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Expiry Date',
            name: 12,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Shelf Life',
            name: 13,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Shelf Life After Opening',
            name: 14,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Duration Description',
            name: 15,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Commercial Presenation',
            name: 16,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturing Site',
            name: 17,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Postal Address',
            name: 18,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Physical Address',
            name: 19,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Telephone No.',
            name: 20,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Mobile No.',
            name: 21,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Email Address',
            name: 22,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Country',
            name: 23,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Site Region',
            name: 24,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader',
            name: 25,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Postal Address',
            name: 26,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Physical Address',
            name: 27,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Telephone No.',
            name: 28,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Mobile No.',
            name: 29,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Email Address',
            name: 30,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Country',
            name: 31,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Region',
            name: 32,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent',
            name: 33,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Agent Postal Address',
            name:34,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Agent Physical Address',
            name: 35,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Agent Telephone No.',
            name: 36,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Agent Mobile',
            name: 37,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Agent Email',
            name: 38,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Agent Country',
            name: 39,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Agent Region',
            name: 40,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Place of Issue',
            name: 41,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Issue Date',
            name: 42,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Expiry Date',
            name: 43,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
        ]
});