/**
 * Created by Kip on 10/5/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsFrm', {
    extend: 'Admin.view.workflowmanagement.views.forms.WorkflowSubmissionsGenericFrm',
    xtype: 'workflowsubmissionsfrm',
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
                    ui: 'soft-purple',
                    action_url: 'workflow/handleApplicationSubmission'//'workflow/submitApplication'
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