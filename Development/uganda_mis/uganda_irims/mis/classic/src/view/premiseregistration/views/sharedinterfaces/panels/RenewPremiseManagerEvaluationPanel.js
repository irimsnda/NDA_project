/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'renewpremisemanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerevaluationgrid'//managerevaluationrenewalgrid'
        }
    ]
});