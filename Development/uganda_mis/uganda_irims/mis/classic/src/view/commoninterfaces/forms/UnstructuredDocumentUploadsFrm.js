Ext.define('Admin.view.commoninterfaces.forms.UnstructuredDocumentUploadsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'unstructureddocumentuploadsfrm',
    controller: 'commoninterfacesVctr',
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
            name: 'document_type_id'
        },{
            xtype: 'hiddenfield',
            name: 'reference_record_id'
        },{
            xtype: 'hiddenfield',
            name: 'table_name'
        },
        {
            xtype: 'hiddenfield',
            name: 'reference_table_name'
        },
        {
            xtype: 'hiddenfield',
            name: 'node_ref'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
            xtype: 'filefield',
            fieldLabel: 'File/Document',
            allowBlank: false,
            name: 'uploaded_doc'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            name: 'description',
            allowBlank: true
        }
    ],
    buttons: [{
        xtype: 'button',
        text: 'Upload',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-upload',
        name: 'upload_file',
        upload_tab: '',
        storeID: '',
        formBind: true
    }]
});