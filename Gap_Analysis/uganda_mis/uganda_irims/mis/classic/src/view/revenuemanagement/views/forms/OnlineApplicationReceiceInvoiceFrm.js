/**
 * Created by Kip on 11/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.OnlineApplicationReceiceInvoiceFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineapplicationreceiceinvoicefrm',
    autoScroll: true,
    controller: 'revenuemanagementvctr',
    layout: 'form',
    frame: true,
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
	
    items: [{
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'gmp_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'curr_stage_id'
    },  {
        xtype: 'hiddenfield',
        name: 'is_manager_query'
    }, {
        xtype: 'hiddenfield',
        name: 'status_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_status_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name'
    }, {
        xtype: 'hiddenfield',
        name: 'has_queries'
    }, {
        xtype: 'fieldset',
        layout: 'form',
        style: 'background:white;padding:0',
        defaults: {
            allowBlank: false
        },
        items: [
			{
            xtype: 'combo',
            fieldLabel: 'Fee Type',
            name: 'fee_type_id',
            valueField: 'id',
            labelWidth: 80,
            width: 380,
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            store: {
                type: 'feetypesstr',
                autoLoad: true
            },
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            fieldStyle: {
                'font-weight': 'bold'
            },
			listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        cost_categorystr = form.down('combo[name=cost_category_id]').getStore(),
						section_id =form.down('hiddenfield[name=section_id]').getValue();
                        filter = {
                            fee_type_id: newVal,
							section_id:section_id
                        };
                        filter = JSON.stringify(filter);
                    cost_categorystr.removeAll();
                    cost_categorystr.load({params: {filter: filter}});
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Cost Category',
            store: 'costcategoriesstr',
            name: 'cost_category_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            width: 380,bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            fieldStyle: {
                'font-weight': 'bold'
            },
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        costSubStore = form.down('combo[name=cost_subcategory_id]').getStore(),
                        filter = {
                            cost_category_id: newVal
                        };
                        filter = JSON.stringify(filter);
                    costSubStore.removeAll();
                    costSubStore.load({params: {filter: filter}});
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Cost Sub Category',
            labelWidth: 130,
            store: 'costsubcategoriesstr',
            valueField: 'id',
            name: 'cost_subcategory_id',
            displayField: 'name',
            forceSelection: true,
            width: 380,bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            queryMode: 'local',
            fieldStyle: {
                'font-weight': 'bold'
            },
            listeners: {
                change: function (cmbo) {
                    var form = cmbo.up('form'),
						fee_type_id = form.down('combo[name=fee_type_id]').getValue();
						cost_category_id = form.down('combo[name=cost_category_id]').getValue(),
                        cost_subcategory_id = form.down('combo[name=cost_subcategory_id]').getValue();
						element_costsstr = form.down('combo[name=element_costs_id]').store;
						
						element_costsstr.load({
								params:{
									fee_type:fee_type_id,
									cost_subcategory:cost_subcategory_id,
									cost_category_id:cost_category_id
								}
						})
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },{//Cost Element
			xtype: 'combo',
            fieldLabel: 'Cost Element',
            labelWidth: 130,bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            store: 'costsubcategoriesstr',
            valueField: 'id',
            name: 'element_costs_id',
            displayField: 'element',
            forceSelection: true,
            width: 380,
            queryMode: 'local',
            fieldStyle: {
                'font-weight': 'bold'
            },
            listeners: {
				beforerender: {
					fn: 'setWorkflowCombosStore',
					config: {
						pageSize: 10000,
						storeId: 'invoicingcostelementsstr',
						proxy: {
							url: 'api/getElementCosts'
						}
					},
					isLoad: false
				},
				change: function (cmbo,newValue) {
                    var form = cmbo.up('form');
					var record = cmbo.findRecordByValue(newValue);
					   if (record) {
						  // Do something...
						  form.down('numberfield[name=cost]').setValue(record.get('cost'));
							form.down('combo[name=currency_id]').setValue(record.get('currency_id'));
							
					   }
							
                }
			}
		},{
				xtype:'numberfield',
				name:'cost',readOnly: true,
				fieldLabel: 'Cost'
		},{
				xtype: 'combo',
				fieldLabel: 'Currency',
				store: 'currenciesstr',
				valueField: 'id',
				displayField: 'name',
				queryMode: 'local',
				forceSelection: true,  readOnly: true,
				name: 'currency_id',
				allowBlank: false,
				readOnly: true,
				 listeners: {
					beforerender: {
						fn: 'setWorkflowCombosStore',
						config: {
							pageSize: 100,
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
		},{
				xtype: 'combo',
				fieldLabel: 'Paying Currency',
				store: 'currenciesstr',
				valueField: 'id',
				displayField: 'name',
				queryMode: 'local',
				forceSelection: true,  
				name: 'paying_currency_id',
				allowBlank: false,
				 listeners: {
					beforerender: {
						fn: 'setWorkflowCombosStore',
						config: {
							pageSize: 100,
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
		}]
    }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Generate Invoice',
                    iconCls: 'x-fa fa-check-square',
                    name: 'savegenerate_invoice',
                    action: 'submit',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'workflow/saveonlineapplicationreceiceinvoiceDetails'
                 //   action_url: 'revenue_management/saveonlineapplicationreceiceinvoiceDetails'
                }, {
                    text: 'Close',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }
            ]
        }
    ]
});