/**
 * Created by Softclans on 5/21/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.AppDataAppealRequestsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'appdataappealrequestsfrm',
    controller: 'commoninterfacesVctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults:{
        labelAlign: 'top',
        columnWidth: 1,
        margin: 4
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },{
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Type of Appeal',
            name: 'appeal_type_id',
            forceSelection: true,
            allowBlank: false,
            //readOnly: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_appeal_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'htmleditor',
            name: 'appeal_request',
            fieldLabel: 'Appeal Request'
        }
    ],
    buttons:[
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            action_url: 'api/saveApplicatioAppealReasons',
            handler: 'doCreateCommonParamWin',
            storeID: 'appdataappealrequestsstr',
            table_name: 'tra_application_appealdata'
        }
    ]
});