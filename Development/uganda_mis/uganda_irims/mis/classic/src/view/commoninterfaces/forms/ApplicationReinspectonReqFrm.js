/**
 * Created by softclans
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationReinspectonReqFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationreinspectonreqfrm',
    controller: 'commoninterfacesVctr',
    itemId: 'applicationRaiseQueryFrmId',
    frame: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 1,
    defaults: {
        margin: 5,
        columnWidth: 1,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'checklistitems_queries'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'combo',
            fieldLabel: 'Request Category',
            name: 'query_processstage_id',
            forceSelection: true,
            queryMode: 'local',  
            value: 5,
            displayField: 'name',
            valueField: 'id',
            hidden: true,
            allowBlank: true,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_query_processstages'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'RE-Inspection Request Category Type',
            name: 'query_type_id',value: 13,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            hidden: true,
            allowBlank: true,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_query_types'
                            }
                        }
                    },
                    isLoad: false
                },
                afterrender:function(cbo){
                            var frm = cbo.up('form'), 
                            query_typeStr = frm.down('combo[name=query_type_id]').getStore(),
                            filters = {query_processstage_id: 5},
                            filters = JSON.stringify(filters);
                            query_typeStr.load({params:{filters:filters}});
                }

            }
        },{
            xtype: 'hiddenfield',
            name: 'is_structured', 
            value: 1
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Remarks',
            name: 'comments',
            columnWidth: 1,
            allowBlank: false
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Manager Remark',
            hidden: true,
            name: 'manager_remark',
            allowBlank: true
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->',
                {
                    xtype: 'button',
                    text: 'Save and Proceed',
                    ui: 'soft-purple',
                    nextStep: 1,
                    iconCls: 'x-fa fa-forward',
                    name: 'qry_tochecklist_btn',
                    action: 'save_query',
                    action_url: 'api/saveApplicationReinspectionREquests',
                    handler: 'saveReinspectiontApplicationQuery'
                }
            ]
        }
    ],
    listeners: {
        afterrender: function (form) {
            var panel = form.up('panel'),
                record = form.getValues(),
                query_type = record.query_type_id,
                is_manager_review = panel.down('hiddenfield[name=is_manager_review]').getValue();
            if(is_manager_review && query_type == 1 && status != 4){
                form.down('textarea[name=manager_remark]').setVisible(false);
            }
        }
    }
});