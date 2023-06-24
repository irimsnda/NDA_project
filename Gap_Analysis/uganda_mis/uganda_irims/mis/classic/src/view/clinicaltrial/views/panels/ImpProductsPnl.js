/**
 * Created by Kip on 1/21/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ImpProductsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'impproductspnl',
    controller: 'clinicaltrialvctr',
    layout: 'border',
    defaults: {
        split: true
    },
    height: 565,
    frame: true,
    items: [
        {
            xtype: 'impproductsfrm',
            region: 'center'
        },
        {
            xtype: 'impproductingredientsgrid',
            region: 'south',
            height: 250,
            hidden: true
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Add Ingredient',
                    iconCls: 'x-fa fa-plus',
                    ui: 'soft-purple',
                    name: 'add_ingredient',
                    winTitle: 'IMP Product Ingredient',
                    winWidth: '35%',
                    childXtype: 'impproductingredientsfrm'
                },
                {
                    xtype: 'button',
                    text: 'Save Product details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    handler: 'saveImpProductDetails'
                }
            ]
        }
    ]
});