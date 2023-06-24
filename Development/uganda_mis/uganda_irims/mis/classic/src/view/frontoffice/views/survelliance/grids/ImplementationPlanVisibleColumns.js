Ext.define('Admin.view.frontoffice.survelliance.grids.ImplementationPlanVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'implementationplanvisiblecolumns',
    title: 'Implementation Plan Columns',
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
            boxLabel: 'Implementation Identity',
            name: 46,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Implementation Year',
            name: 47,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Implementation Start Date',
            name: 48,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        },{
            boxLabel: 'Implementation End Date',
            name: 49,
            checked: false,
            listeners: {
                change: 'func_showhideSampleProductSpreasheetColumn'
            }
        }]
    });