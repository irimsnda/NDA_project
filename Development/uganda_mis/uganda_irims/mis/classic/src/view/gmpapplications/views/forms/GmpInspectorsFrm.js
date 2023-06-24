/**
 * Created by Kip on 1/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.GmpInspectorsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gmpinspectorsfrm',
    controller: 'gmpapplicationsvctr',
    layout: 'form',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'inspection_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Inspector',
            margin: '0 20 20 0',
            allowBlank: false,
            name: 'inspector_id',
            valueField: 'id',
            anyMatch: true,
            displayField: 'fullnames',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'usermanagement/getActiveSystemUsers',
                            extraParams: {
                                model_name: 'User'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Role',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            name: 'role_id',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_inspectors_roles'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
    ],
    buttons:[
        {
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'gmp_inspectorsdetails',
            storeID: 'gmpinspectorsstr',
            action_url: 'gmpapplications/saveGmpScheduleInspectors',
            handler: 'doCreateGmpApplicationParamWin'
        }
    ]
});