/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.VariationCategoriespnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'variationcategoriespnl',
    title: 'Type of Variations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'variationcategoriesgrid'
        }
    ]
});
