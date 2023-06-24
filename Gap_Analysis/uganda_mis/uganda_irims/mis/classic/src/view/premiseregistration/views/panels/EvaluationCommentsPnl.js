/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.EvaluationCommentsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'evaluationcommentspnl',
    controller: 'premiseregistrationvctr',
    frame: true,
    items: [
        {
           xtype: 'hiddenfield',
           name: 'comment_type_id'
        },{
           xtype: 'hiddenfield',
           name: 'application_id'
        },{
           xtype: 'hiddenfield',
           name: 'application_code'
        },
        {
            xtype: 'form',
            bodyPadding: 5,
            layout: 'form',
            hidden: true,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'textarea',
                    name: 'comment',
                    emptyText: 'Your comment...',
                    allowBlank: false
                }
            ],
            buttons: [
                {
                    xtype: 'button',
                    text: 'Save Comment',
                    ui: 'soft-purple',
                    name: 'save_comment',
                    iconCls: 'x-fa fa-save',
                    formBind: true
                },
                {
                    text: 'Cancel',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-close',
                    handler: 'cancelAddApplicationEvaluationComment'
                }
            ]
        },
        {
            xtype: 'evaluationcommentsgrid'
        }
    ]
});