/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.common_panels.ProductEvaluationCommentsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productevaluationcommentspnl',
    controller: 'productregistrationvctr',
    frame: true,
    viewModel: {
        type: 'productregistrationvm'
    },
    items: [
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
                    storeId: '',
                    table_name: 'tra_evaluations_overralcomments',
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
            xtype: 'productevaluationcommentsgrid'
        }
    ]
});