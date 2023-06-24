/**
 * Created by Softclans on 4/27/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationRejectionSubmissionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationrejectionsubmissionfrm',
    controller: 'commoninterfacesVctr',
    layout: 'form',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        }, {
            xtype: 'hiddenfield',
            name: 'application_code'
        }, {
            xtype: 'hiddenfield',
            name: 'table_name'
        },{
            xtype: 'hiddenfield',
            name: 'module_id'
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Application Rejection Remarks',
            allowBlank: true,
            labelAlign: 'top',
            name: 'rejection_comment',
            labelStyle: "font-weight:bold"
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Submit Application',
            iconCls: 'x-fa fa-check',
            ui: 'soft-red',
            name: 'submit_rejectedapp',
            formBind: true,
            action_url: ''
        }
    ]
});