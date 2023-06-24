Ext.define('Admin.view.revenuemanagement.views.forms.AdhocInvoiceOtherDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'adhocinvoiceotherdetailsFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'left',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Application Type',
        margin: '0 20 20 0',
        name: 'adhocapp_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_adhcodapplication_type '
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Section',
        margin: '0 20 20 0',
        name: 'section_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sections'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Zone',
        margin: '0 20 20 0',
        name: 'zone_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_zones'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Payment(s) Details',
        margin: '0 20 20 0',
        name: 'application_description',
        allowBlank: true
    }],
});