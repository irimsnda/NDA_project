/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsEvaluation', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsEvaluation',
    xtype: 'structuredpmsevaluation',

    items: [
        {
            xtype: 'structuredpmsevaluationwizard'
        },{
            xtype:'hiddenfield',
            name:'analysis_type',
            value: 1
        }
    ]
});