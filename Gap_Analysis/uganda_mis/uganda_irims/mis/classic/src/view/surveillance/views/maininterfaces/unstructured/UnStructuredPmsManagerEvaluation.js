/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsManagerEvaluation', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsManagerEvaluation',
    xtype: 'unstructuredpmsmanagerevaluation',
    items: [
        {
            xtype: 'unstructuredpmsmanagerevaluationpnl'
        }
    ]
});