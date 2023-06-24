Ext.define('Admin.view.frontoffice.importexport.grids.IEAdditionalFiltersView', {
    extend: 'Ext.form.Panel',  
    scroll: true,
    collapsible: true,
    autoScroll: true,
    collapsed:true,
    width: '100%',
    height: '100%',
    xtype: 'ieadditionalfiltersview',
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
            name: 45,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Received To Date',
            name: 46,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Certificate Issue From Date',
            name: 47,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Certificate Issue To Date',
            name: 48,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
  ]
});