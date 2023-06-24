/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.VariationCategoriesSectionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'variationcategoriessectionspnl',
    title: 'Type of Variations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'variationsectionscategoriesgrid'
        }
    ]
});
