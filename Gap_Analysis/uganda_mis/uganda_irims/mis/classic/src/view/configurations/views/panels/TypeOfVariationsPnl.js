/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.TypeOfVariationsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'typeofvariationspnl',
    title: 'Type of Variations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'typeofvariationsgrid'
        }
    ]
});
