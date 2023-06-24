/**
 * Created by Softclans on 6/6/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationDismissalFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationdismissalfrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        margin: 3,
        columnWidth: 1,
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_dismissed_applications'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'combo',
            name: 'dismissal_reason_id',
            allowBlank: false,
            forceSelection: true,
            fieldLabel: 'Dismissal Reason',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_applicationdismissal_reasons'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Dismissal Remarks',
            name: 'dismissal_remarks'
        }
    ],
    buttons: [
        {
            text: 'Dismiss Application',
            iconCls: 'x-fa fa-thumbs-down',
            ui: 'soft-purple',
            name: 'save_dismissal_details',
            //handler: 'doCreateCommonParamWin',
            formBind: true,
            action_url: 'api/saveApplicationDismissalDetails',
            table_name: 'tra_dismissed_applications',
            storeID: 'intraystr',
        }
    ]
});