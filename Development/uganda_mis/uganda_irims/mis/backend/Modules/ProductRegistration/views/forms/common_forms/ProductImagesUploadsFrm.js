/**
 * Created by softclans
 * user robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductImagesUploadsFrm', {
    extend: 'Admin.view.commoninterfaces.forms.ApplicationDocUploadsFrm',
    xtype: 'productImagesUploadsFrm',
    frame: true,
    items:[{
        xtype: 'hiddenfield',
        name: 'id'
    },
    {
        xtype: 'hiddenfield',
        name: 'application_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'application_code'
    },
    {
        xtype: 'hiddenfield',
        name: 'process_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'section_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'module_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    },
    {
        xtype: 'hiddenfield',
        name: 'document_type_id'
    }, 
    {
        xtype: 'combo',
        name: 'document_requirement_id',
        allowBlank: false,
        forceSelection: true,
        fieldLabel: 'Document Requirement',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    storeId: 'document_requirementsStr',
                    proxy: {
                        url: 'documentmanagement/getProcessApplicableDocRequirements'
                    }
                },
                isLoad: false
            }
        }
    }, {
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
        name: 'uploadimage_btn',
        storeID:'productimagesUploadsStr',
        upload_tab: '',
        formBind: true
    }]

});