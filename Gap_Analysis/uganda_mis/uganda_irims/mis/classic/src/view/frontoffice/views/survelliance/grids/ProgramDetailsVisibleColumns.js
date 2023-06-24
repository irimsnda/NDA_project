Ext.define('Admin.view.frontoffice.survelliance.grids.ProgramDetailsVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'programdetailsvisiblecolumns',
    title: 'Program Detail Columns',
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
            boxLabel: 'Program Name',
            name: 26,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Program Start Date',
            name: 27,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Program End Date',
            name: 28,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Program Description',
            name: 29,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }]

    });