

Ext.define('Admin.view.systemadministrationprocess.views.forms.AppCertificateReupdateRequestsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'appcertificatereupdaterequestsfrm',
    itemId: 'appcertificatereupdaterequestsfrm',
    autoScroll: true,
    controller: 'systemadministrationprocessvctr',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        labelAlign: 'right',
        labelWidth: 108,
        margin: 5,
        xtype: 'textfield',
        width: '100%',
        margin: 5
    },
    layout: {
        type: 'vbox'
    },
    layout: 'vbox',
    items: [{
        xtype: 'combo',
        fieldLabel: 'Modules',
        margin: '0 20 20 0',
        name: 'module_id',
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
                            table_name: 'modules'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        fieldLabel: 'Reference Number/Tracking Number',
        emptyText: 'Reference Number',
        xtype:'textfield',
        allowBlank: false,
        name: 'reference_no'
    },{
        fieldLabel: 'Requested By',
        emptyText: 'Request By',
        xtype:'textfield',
        allowBlank: false,
        name: 'requested_by'
    },{
        fieldLabel: 'Reason ',
        emptyText: 'Reason ',
        xtype:'textarea',
        allowBlank: false,
        name: 'reason'
    }],
    buttons: [{
        text: 'Save Request Details',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        formBind: true,
        name:'btnupdateauthorisation',
        action_url: 'reports/saveAppCertificateReupdateRequests',
        storeId: 'appcertificatereupdaterequestsgridstr'
    }]
});