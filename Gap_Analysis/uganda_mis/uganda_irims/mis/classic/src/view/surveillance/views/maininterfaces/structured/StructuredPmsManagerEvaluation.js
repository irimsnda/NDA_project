/**
 * Created by Kip on 3/12/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsManagerEvaluation', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsManagerEvaluation',
    xtype: 'structuredpmsmanagerevaluation',
    items: [
        {
            xtype: 'structuredpmsmanagerevaluationpnl'
        }
    ]
});