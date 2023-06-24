/**
 * Created by Kip on 10/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationQueryResponseFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationqueryresponsefrm',
    controller: 'commoninterfacesVctr',
    
    scrollable: true,
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    defaults: {
        margin: 3,
        allowBlank: false,
		width: '99%',
		margin: 5,
        labelAlign: 'top'
    },
    items: [{
            xtype: 'htmleditor',
            fieldLabel: 'Query',
            name: 'query',
            readOnly: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Query Response',
            name: 'query_response',
            allowBlank: true,
            readOnly: true
        },{
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
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'unset_data',
            value: 'module_id,sub_module_id,section_id,table_name,item_resp_id'
        }
    ]
});