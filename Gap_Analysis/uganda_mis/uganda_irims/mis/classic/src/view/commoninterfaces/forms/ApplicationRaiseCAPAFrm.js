/**
 * Created by softclans
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationRaiseCAPAFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationraisecapafrm',
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
    items: [{
            xtype: 'hiddenfield',
            name: 'status',
            allowBlank: false
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            allowBlank: false,
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
            xtype: 'hiddenfield',
            name: 'inspection_capa_id'
        },{
            xtype: 'combo',
            fieldLabel: 'Category',
            name: 'query_processstage_id',
            forceSelection: true,
            queryMode: 'local',value: 3,
            displayField: 'name',readOnly: true,
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
            xtype: 'hiddenfield',
            name: 'query_type_id',
            value: 'checklistitems_queries',value: 5,
        },{
            xtype: 'hiddenfield',
            name: 'is_structured',
            allowBlank: false, 
            value: 1
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Reasons/Remarks for CAPA REquest',
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
                 //   formBind: true,
                    action: 'save_query',
                    action_url: 'api/saveChecklistApplicationCAPA',
                    handler: 'saveChecklistApplicationCAPA'
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