Ext.define('Admin.view.pv.views.forms.PvDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvDetailsFrm',
    itemId: 'DetailsFrm',
    layout: {
        type: 'column'
    },
  
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    }, 
    autoScroll: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'pv_id',
            value: ''
        }, {
            xtype: 'hiddenfield',
            value: 'tra_pv_applications',
            name: 'table_name'
        },{
            xtype: 'combo',
            fieldLabel: 'ADR Reporting Types',
            name: 'route_of_administration_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
          xtype:'textfield',
          fieldLabel: 'Full Patients Name'  ,
          name:'patient_name'
        },{
            xtype: 'combo',
            fieldLabel: 'Gender/Sex',
            name: 'gender_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_gender'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'numberfield',
            fieldLabel: 'Age'  ,
            name:'age'
          },{
            xtype:'numberfield',
            fieldLabel: 'Weight(Kgs)'  ,
            name:'weight'
          },{
            xtype:'numberfield',
            fieldLabel: 'Date of onset of REacion'  ,
            name:'date_of_onsetreaction'
          },{
            xtype:'numberfield',
            fieldLabel: 'Date of onset of REacion'  ,
            name:'date_of_onsetreaction'
          },{
            xtype: 'combo',
            fieldLabel: 'Was Drug Discontinued',
            name: 'gender_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_confirmation'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Events Outcome',
            name: 'gender_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_outcomes'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Seriousness',
            name: 'gender_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_seriousness'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'numberfield',
            fieldLabel: 'Date Recovered/Died'  ,
            name:'date_of_onsetreaction'
          },{
            xtype:'textarea',
            columnWidth: 0.99,
            fieldLabel: 'Rechallenge Outcome'  ,
            name:'date_of_onsetreaction'
          },{
            xtype:'textarea',
            columnWidth: 0.99,
            fieldLabel: 'Pre-Exsting Conditions (E.g Allergies, Pregnancy, Smoking others)'  ,
            name:'date_of_onsetreaction'
          },{
            xtype:'textarea',
            columnWidth: 0.99,
            fieldLabel: 'Description of Adverse Event(Inclusind the Laboratory Results)'  ,
            name:'date_of_onsetreaction'
          },{
            xtype:'textarea',
            columnWidth: 0.99,
            fieldLabel: 'Treatment for Reaction'  ,
            name:'date_of_onsetreaction'
          },
    ]
});