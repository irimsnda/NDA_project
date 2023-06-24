/**
 * Created by Softclans on 10/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.ReInspectionChecklistItemsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'reinspectionchecklistitemsfrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    scrollable: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 3,
        allowBlank: false,
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
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },{
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'checklistitems_queries'
        }, {
            xtype: 'hiddenfield',
            name: 'query_id'
        },{
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },{
            xtype: 'hiddenfield',
            name: 'process_id'
        },{
            xtype: 'hiddenfield',
            name: 'is_structured'
        },{ 
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
            xtype: 'hiddenfield',
            name: 'unset_data',
            value: 'module_id,sub_module_id,section_id,table_name,item_resp_id'
        }, 
        {
            xtype: 'htmleditor',
            fieldLabel: 'Query/Observations/Finding',
            minHeight: 300,
            name: 'query'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comment',
			hidden: true,
            allowBlank: true
        },
       
        {
            xtype: 'textfield',
            fieldLabel: 'Reference Section', 
            name: 'reference_section',
            allowBlank: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Manager Query Comment',
            name: 'manager_query_comment',
            allowBlank: true,
            hidden: true,
            readOnly: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Manager Query Response Comment',
            name: 'manager_queryresp_comment',
            allowBlank: true,
            hidden: true,
            readOnly: true
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
               
                '->',
                {
                    xtype: 'button',
                    text: 'Save Query',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    formBind: true,
                    reload_base:1,
                    action: 'save_query',
                    action_url: 'api/saveReinspectionchecklistitems',
                    handler: 'saveReinspectionchecklistitems'
                }
            ]
        }
    ]
});