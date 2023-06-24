Ext.define('Admin.view.parameters.views.forms.DeviceTypeFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.devicetypefrm',
    frame: false,
    bodyPadding: 10,
    controller: 'parametervctr',
    require : [
        'Ext.form.field.VTypes'
    ],
    layout: {
        type: 'form'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false
    },
    fieldDefaults: {
        xtype: 'textfield',
        cls: ''
    },
    items: [{
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id'
    }, {
        xtype: 'textfield',
        value: token,
        name: '_token',
        hidden: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'name'
    },{
        xtype: 'textfield',
        fieldLabel: 'Code',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'code'
    },{
        xtype: 'combo',
        fieldLabel: 'Section',
        width: 220,
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'section_id',
        allowBlank: false,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
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
        fieldLabel: 'Cost Types',
        width: 220,
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'cost_type_id',
        allowBlank: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_cost_types'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'description'
    },
    {
        xtype: 'checkboxfield',
        name: 'is_enabled',
        fieldLabel: 'Is enabled',
        inputValue: '1',
        uncheckedValue: '0',

    },
        {
            xtype: 'combo',
            fieldLabel: 'LIMS Device Type',
            name: 'lims_device_type_id',
            allowBlank: true,
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'medicaldevices_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }],
    action_url: 'parameters/devicetype',
    store: 'devicetypesstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'devicetypesgrid',
        form: 'devicetypefrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'devicetypesgrid',
        form: 'devicetypeFrm',
        formBind: true,
        handler: 'doSaveRecord',
        table_name: 'par_device_types',
        storeID: 'devicetypesstr',
        ui: 'soft-purple'
    }, {
        text: 'Reset',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-close',
        width: 15,
        height: 35,
        padding: '5 5 5 5',
        handler: function (btn) {
            btn.up('form').getForm().reset();
        }
    }]
});