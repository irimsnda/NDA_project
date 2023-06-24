/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsEvaluation', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsEvaluation',
    xtype: 'unstructuredpmsevaluation',

    items: [
        {
            xtype: 'unstructuredpmsevaluationwizard'
        },{
            xtype:'hiddenfield',
            name:'analysis_type',
            value: 1
        }
    ]
});