Ext.define('Admin.view.commoninterfaces.forms.UploadedApplicationPaymentsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'uploadedapplicationpaymentsfrm',
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
            name: 'id'
        },
        
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype:'textfield',
            fieldLabel: 'Bank Name',
            name: 'bank_name'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Payment Mode',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            name: 'payment_mode_id',
            allowBlank: false,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_payment_modes'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'numberfield',
            fieldLabel: 'Amount',
            minValue: 1,
            name: 'amount_paid',
            allowBlank: false
        }, {
            xtype: 'combo',
            fieldLabel: 'Currency',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            name: 'currency_id',
            allowBlank: false,
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_currencies'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype:'textfield',
            fieldLabel: 'Payment Reference',
            name: 'payment_reference'
        },{
            xtype: 'filefield',
            fieldLabel: 'File/Document (proof of Payment)',
            allowBlank: false,
            name: 'uploaded_doc'
        },
    ],
    buttons: [{
        xtype: 'button',
        text: 'Save Payment Upload details',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-upload',
        name: 'savepaymentsdetails',
        upload_tab: '',
        storeID: 'applicationpaymentsstr',
        formBind: true
    }]
});