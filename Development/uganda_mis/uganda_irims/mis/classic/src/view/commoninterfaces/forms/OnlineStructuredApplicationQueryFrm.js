/**
 * Created by Softclans on 6/16/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.OnlineStructuredApplicationQueryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlinestructuredapplicationqueryfrm',
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
            name: 'module_id'
        }, {
            xtype: 'hiddenfield',
            name: 'table_name'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            allowBlank: true,
            name: 'comment',
            labelStyle: "font-weight:bold"
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Submit Application',
            iconCls: 'x-fa fa-check',
            ui: 'soft-red',
            name: 'submit_queriedapp',
            formBind: true,
            action_url: ''
        }
    ]
});