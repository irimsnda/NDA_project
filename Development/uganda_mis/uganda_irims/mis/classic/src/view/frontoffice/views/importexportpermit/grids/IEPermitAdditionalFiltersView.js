Ext.define('Admin.view.frontoffice.importexportpermit.grids.IEPermitAdditionalFiltersView', {
    extend: 'Ext.form.Panel',  
    scroll: true,
    collapsible: true,
    autoScroll: true,
    collapsed:true,
    width: '100%',
    height: '100%',
    xtype: 'iepermitadditionalfiltersview',
    layout: 'form',
    title: 'Select Addtional Filters',
    margin: 2,
    defaults: {
            xtype: 'checkbox',
            labelAlign: 'right',
            margin: 5,
            labelSeparator: ':',
        },
    items: [ {
            boxLabel: 'Received From Date',
            name: 51,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Received To Date',
            name: 52,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Certificate Issue From Date',
            name: 53,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Certificate Issue To Date',
            name: 54,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
  ]
});