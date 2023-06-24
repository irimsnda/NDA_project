/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.main.GmpEvaluation', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpevaluation',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'applicationprocesstoolbar',
           
    }],
    items: [
        {
            xtype: 'gmpevaluationpanel'
        }
    ]
});