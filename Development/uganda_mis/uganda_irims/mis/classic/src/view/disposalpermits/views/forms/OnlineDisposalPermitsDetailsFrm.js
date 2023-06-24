

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.forms.OnlineDisposalPermitsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlinedisposalpermitsdetailsfrm',
    itemId: 'onlinedisposalpermitsdetailsfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    controller: 'disposalpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.33,
        labelAlign: 'top',
        allowBlank: false,
        
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_disposal_applications'
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        labelWidth: 80,
        width: 320,
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 15
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
            xtype: 'textarea',
            name: 'reason_for_disposal',
            colspan: 2,
            columnWidth: 0.66,
            fieldLabel:'Reason For Disposal',
            bind: {
                readOnly: '{isReadOnly}'
            }

    },{
        xtype: 'numberfield',
        name: 'quantity',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Quantity',
    },{
        xtype: 'combo',
        fieldLabel: 'Packaging Units',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'packaging_unit_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_packaging_units',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'numberfield',
        name: 'total_weight',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Total Weight',
    },{
        xtype: 'combo',
        fieldLabel: 'Weight Units',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'weights_units_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_weights_units',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        name: 'market_value',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Proform Invoice No',
    }, {
        xtype: 'combo',
        fieldLabel: 'Currency',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'currency_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_currencies',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }]
   
});