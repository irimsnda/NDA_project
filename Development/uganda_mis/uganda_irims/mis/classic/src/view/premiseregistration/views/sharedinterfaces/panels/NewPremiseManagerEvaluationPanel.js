/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newpremisemanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerevaluationgrid'
        }
    ]
});