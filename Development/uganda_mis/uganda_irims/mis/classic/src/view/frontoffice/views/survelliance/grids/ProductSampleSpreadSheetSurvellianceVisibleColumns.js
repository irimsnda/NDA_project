Ext.define('Admin.view.frontoffice.survelliance.grids.ProductSampleSpreadSheetSurvellianceVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'productsamplespreadsheetsurvelliancevisiblecolumns',
    title: 'Sample Application Columns',
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
    items:[{
            boxLabel: 'Tracking No',
            name: 58,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Reference No',
            name: 59,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'sample_refno',
            name: 2,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Sample Name',
            name: 3,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'sample_code',
            name: 4,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Dosage Form',
            name: 5,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Product Form',
            name: 6,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Device Type',
            name: 7,
            checked: true,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Common Name',
            name: 8,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Date Collected',
            name: 9,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Classification',
            name: 10,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Packaging Size',
            name: 11,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Packaging Unit',
            name: 12,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Collected Samples',
            name: 13,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'batch_no',
            name: 14,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer',
            name: 15,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturing Date',
            name: 16,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Expiry Date',
            name: 17,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Storage',
            name: 18,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'collectionsite_storage_condition',
            name: 19,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Seal Condition',
            name: 20,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Shelf Life',
            name: 21,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Shelf_lifeafter_opening',
            name: 22,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Sampling Reason',
            name: 23,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Collector',
            name: 24,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Sample Type',
            name: 25,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }
//Program details
//product and regions and sites
//then implementation columns
        ,{
            boxLabel: 'Trader',
            name: 50,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Postal Address',
            name: 51,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Physical Address',
            name: 52,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Tell',
            name: 53,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Mobile',
            name: 54,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Email Address',
            name: 55,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Country',
            name: 56,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Trader Region',
            name: 57,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }
        ]
});
