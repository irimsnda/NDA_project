/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredManagerScreeningEvaluation', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsEvaluation',
    xtype: 'structuredmanagerscreeningevaluation',
    items: [
        {
            xtype: 'structuredmanagerscreeningevaluationwizard'
        },{
            xtype:'hiddenfield',
            name:'analysis_type',
            value: 6
        }
    ]
});