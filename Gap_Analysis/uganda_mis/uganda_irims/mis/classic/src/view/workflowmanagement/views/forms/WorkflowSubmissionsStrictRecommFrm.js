/**
 * Created by Kip on 11/2/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsStrictRecommFrm', {
    extend: 'Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsGenericFrm',
    xtype: 'workflowsubmissionsstrictrecommfrm',
    
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Submit Application',
                    iconCls: 'x-fa fa-check-square',
                    name: 'app_submission_btn',
                    action: 'submit',
                    formBind: true,
                    action_url: 'workflow/handleApplicationSubmission',
                    ui: 'soft-purple'
                }, {
                    text: 'Close',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }
            ]
        }
    ]

});