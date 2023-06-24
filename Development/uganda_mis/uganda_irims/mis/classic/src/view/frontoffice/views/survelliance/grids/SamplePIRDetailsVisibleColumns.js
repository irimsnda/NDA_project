Ext.define('Admin.view.frontoffice.survelliance.grids.SamplePIRDetailsVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'samplepirdetailsvisiblecolumns',
    title: 'Analysis Details',
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
            boxLabel: 'PIR Recommendation',
            name: 61,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'PIR Date',
            name: 62,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'PIR Comment',
            name: 63,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Analysis Type',
            name: 64,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'LIMS Reference',
            name: 65,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Analysis Request Date',
            name: 66,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Analysis Requested By',
            name: 67,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Analysis Status',
            name: 68,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Screening Recommendation',
            name: 69,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Conformatory Recommendation',
            name: 70,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }]

    });