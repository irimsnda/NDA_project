/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.ReferenceNosTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'referencenostypespnl',
    title: 'Reference Numbers Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'referencenostypesgrid'
        }
    ]
});
