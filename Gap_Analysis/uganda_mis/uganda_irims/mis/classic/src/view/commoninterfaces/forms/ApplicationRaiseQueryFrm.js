/**
 * Created by softclans
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationRaiseQueryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationRaiseQueryFrm',
    controller: 'commoninterfacesVctr',
    itemId: 'applicationRaiseQueryFrmId',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
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
            xtype: 'combo',
            fieldLabel: 'Query Category',
            name: 'query_processstage_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
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
                },
                change:function(cbo,value){
                            var frm = cbo.up('form'), 
                            query_typeStr = frm.down('combo[name=query_type_id]').getStore(),
                            filters = {query_processstage_id: value},
                            filters = JSON.stringify(filters);
                            query_typeStr.load({params:{filters:filters}});
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Request for Additional Information/Query Type',
            name: 'query_type_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
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
                }
            }
        },{
            xtype: 'hiddenfield',
            value: 1,
            name: 'is_structured'
        },{
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comments',
            allowBlank: true
        },
        {
            xtype: 'textarea',
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
                    formBind: true,
                    action: 'save_query',
                    action_url: 'api/saveChecklistApplicationQuery',
                    handler: 'saveChecklistApplicationQuery'
                }
            ]
        }
    ],
    listeners: {
        afterrender: function (form) {
            var panel = form.up('panel'),
                //panel = pnl.up('panel'),
                query_id = panel.down('hiddenfield[name=query_id]').getValue(),
                status_id = panel.down('hiddenfield[name=status_id]').getValue(),
                record = form.getValues(),
                query_type = record.query_type_id,
                is_manager_review = panel.down('hiddenfield[name=is_manager_review]').getValue();
            if(is_manager_review && query_type == 1 && status != 4){
                form.down('textarea[name=manager_remark]').setVisible(true);
            }
        }
    }
});