/**
 * Created by Softclans on 4/27/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.OnlineApplicationRejectionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineapplicationrejectionfrm',
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
        }, {
            xtype: 'combo',
            fieldLabel: 'Rejection Reason',
            margin: '0 20 20 0',
            name: 'reason_id',
            valueField: 'id',
            displayField: 'name',
            labelAlign: 'top',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            allowBlank: false,
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_onlineapps_rejectionreasons',
                                con: 'portal_db'
                            }
                        }
                    },
                    isLoad: true
                }
            },
            labelStyle: "font-weight:bold"
        },
        {
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
            name: 'submit_rejectedapp',
            formBind: true,
            action_url: ''
        }
    ]
});