Ext.define('Admin.view.frontoffice.product.grids.ProductAdditionalFiltersView', {
    extend: 'Ext.form.Panel',  
    scroll: true,
    collapsible: true,
    autoScroll: true,
    collapsed:true,
    width: '100%',
    height: '100%',
    xtype: 'productadditionalfiltersview',
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
            name: 40,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Received To Date',
            name: 41,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Certificate Issue From Date',
            name: 42,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }, {
            boxLabel: 'Certificate Issue To Date',
            name: 43,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
  ]
});