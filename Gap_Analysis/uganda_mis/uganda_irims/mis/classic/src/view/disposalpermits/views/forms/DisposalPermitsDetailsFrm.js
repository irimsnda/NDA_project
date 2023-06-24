

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
 Ext.define('Admin.view.disposalpermits.views.forms.DisposalPermitsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'disposalpermitsdetailsfrm',
    itemId: 'disposalpermitsdetailsfrm',
    layout: 'column',
    bodyPadding: 5,
    controller: 'disposalpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
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
        name: 'table_name',
        value: 'tra_disposal_applications'
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        labelWidth: 80,
       
        columnWidth: 0.33,
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
        xtype: 'combo',
        fieldLabel: 'Proposed Method of Disposal/Destruction',
        labelWidth: 80,
       
        columnWidth: 0.33,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'proposedmethod_of_disposal_id',
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
                            table_name: 'par_destruction_methods',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },
    
    {
        xtype: 'textarea',
        name: 'otherproposedmethod_of_disposal',
        colspan: 2,
        columnWidth: 0.99,
        fieldLabel:'Other Method of Disposal/Destruction',
        bind: {
            readOnly: '{isReadOnly}'
        }

    }, {
        xtype: 'combo',
        fieldLabel: 'Proposed Disposal Site Option',
        labelWidth: 80,
        
        columnWidth: 0.33,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'disposal_siteoption_id',
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
                            table_name: 'par_disposal_siteoptions',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change:function(cbo,value){
                    var frm = cbo.up('form');
                    if(value== 1){
                        var is_visible = false;
                    }
                    else{
                        var is_visible = true;

                    }
                    frm.down('textfield[name=proposed_destructionsite]').setVisible(is_visible);
                    frm.down('textarea[name=destructionsite_location]').setVisible(is_visible);
                        
            }
        }
    },{
            xtype: 'textfield',
            name: 'proposed_destructionsite',
            allowBlank: true,hidden: true,
            fieldLabel:'Proposed Destruction Site',
            bind: {
                readOnly: '{isReadOnly}'
            }

    },{
            xtype: 'textarea',
            name: 'destructionsite_location',
            colspan: 2, allowBlank: true,hidden: true,
            columnWidth: 0.99,
            fieldLabel:'Proposed Destruction Site Location',
            bind: {
                readOnly: '{isReadOnly}'
            }

    },{
            xtype: 'datefield',
            name: 'proposed_destructiondate',
            fieldLabel:'Proposed Destruction Date',  altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            bind: {
                readOnly: '{isReadOnly}'
            }

    }, {
        xtype: 'combo',
        fieldLabel: 'Reason for Disposal/Destruction',
        labelWidth: 80,
  
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'reason_of_destruction_id',
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
                            table_name: 'par_destruction_reasons',
                            has_filter: 0
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
            columnWidth: 0.99,
            fieldLabel:'Other Reasons For Disposal',
            bind: {
                readOnly: '{isReadOnly}'
            }

    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        columnWidth: 0.33,
        items: [{
            xtype: 'numberfield',
            name: 'total_weight',bind: {
                readOnly: '{isReadOnly}'
            },
            
           columnWidth: 0.49,
            fieldLabel: 'Total Weight',
        },{
            xtype: 'combo',
            fieldLabel: 'Weight Units',
            labelWidth: 80,
           
             columnWidth: 0.49,
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
        }]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        columnWidth: 0.33,
        items: [{
            xtype: 'textfield',  labelAlign: 'top',
            columnWidth: 0.49,
            name: 'market_value',bind: {
                readOnly: '{isReadOnly}'
            },
            fieldLabel: 'Market Value',
        }, {
            xtype: 'combo',
            fieldLabel: 'Currency',
            labelWidth: 80,
            columnWidth: 0.49,
        labelAlign: 'top',
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
    },{
        xtype: 'textarea',
        name: 'product_particulars_description',
        colspan: 2,
        columnWidth: 0.99,
        fieldLabel:'Description of Products to be Disposed',
        bind: {
            readOnly: '{isReadOnly}'
        }

    }]
   
});