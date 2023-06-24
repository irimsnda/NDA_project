Ext.define('Admin.controller.ClinicalTrialCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.clinicalTrial.ClinicalTrialGridAbstractStore',
        'Admin.store.clinicalTrial.ClinicalTrialComboAbstractStore',
        'Admin.store.clinicalTrial.ClinicalTrialStr',
        'Admin.store.clinicalTrial.PharmacoVigilanceAppStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }, {
            ref: 'ctrgcpinspectionselectionfrm',
            selector: '#ctrgcpinspectionselectionfrm'
        }, {
            ref: 'ctrregistrysponsorsfrm',
            selector: '#ctrregistrysponsorsfrm'
        }],
        
        control: {
            'clinicaltrialtb button[name=clinicalTrialHomeBtn]': {
                click: 'clinicalTrialHome'
            },
            'pharmacovigilancereportingtb button[name=pharmacovigilancereportingbtn]': {
                click: 'pharmacovigilancereportingHome'
            },


            
            //NEW
            'newclinicaltrialreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
            'ctrgcpinspectionselectionfrm button[name=btn_savegcpapplication]': {
                click: 'saveGcpClinicalApplicationdetails'
            },
            'newclinicaltrialreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },
            'newclinicaltrialreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'preclinicaltrialreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'preclinicaltrialreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },
            'preclinicaltrialreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },

            'receivingsafetyalertreportswizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },
            'receivingsafetyalertreportswizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
            'receivingsafetyalertreportswizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            //AMENDMENT
            'amendmentclinicaltrialreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickAmendment'
            },
            'amendmentclinicaltrialreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickAmendment'
            },
            'amendmentclinicaltrialreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationAmendment'
            },
            'queryResponseclinicaltrialwizard button[action=quickNav]': {
                click: 'quickNavigationAmendment'
            },
            'clinicaltrialstudysitesgrid button[name=add_clinical_site]': {
                click: 'showAddClinicalSite'
            },
            'impproductsgrid button[name=add_impproduct]': {
                click: 'showAddImpProduct'
            },

            'impproductsgrid': {
                refresh: 'refreshimpproductsgrid'
            },
            'clinicalplaceboproductsgrid': {
                refresh: 'refreshimpproductsgrid'
            },
            'clinicalcomparatorproductsgrid': {
                refresh: 'refreshimpproductsgrid'
            },

            'clinicalplaceboproductsgrid button[name=add_impproduct]': {
                click: 'showAddImpProduct'
            },
            'clinicalcomparatorproductsgrid button[name=add_impproduct]': {
                click: 'showAddImpProduct'
            },
          
            'impproductspnl button[name=add_ingredient]': {
                click: 'showAddImpProductIngredient'
            },
            'impproductingredientsgrid': {
                editRecord: 'showEditImpProductIngredient'
            },
            'studysitesgrid button[name=add_study_site]': {
                click: 'showClinicalTrialWindow'
            },
            'clinicalstudysitesfrm button[name=add_study_site]': {
                click: 'showClinicalTrialWindow'
            },
            'clinicaltrialsponsorfrm button[action=search_btn]': {
                click: 'showAddClinicalTrialPersonnel'
            },
            'clinicaltrialinvestigatorfrm button[action=search_btn]': {
                click: 'showAddClinicalTrialPersonnel'
            },
            'ctrregistrysponsorsfrm button[action=search_btn]': {
                click: 'showAddClinicalTrialRegistrySponsor'
            },
            
            'ctrgcpinspectionselectionfrm button[action=search_clinicaltrial]': {
                click: 'showClinicalTrialsDEtails'
            },
            'ctrgcpinspectionschedulegrid button[action=search_clinicaltrial]': {
                click: 'showGcpInspectionClincialDetails'
            },
            
            'clinicaltrialotherinvestigatorsgrid button[name=add_otherinvestigator]': {
                click: 'showAddClinicalTrialOtherInvestigator'
            },
            'clinicaltrialmonitorsgrid button[name=add_otherinvestigator]': {
                click: 'showAddClinicalTrialOtherInvestigator'
            },
            
            'clinicaltrialmanagermeetinggrid': {
                beforedeselect: 'beforeManagerMeetingAppsGridDeselect'
            },
            'clinicaltrialmanagermeetinggrid button[name=save_btn]': {
                click: 'saveTCMeetingDetails'
            },
            //prepare main interfaces
            //COMMON
            'clinicaltrialinvoicing': {
                afterrender: 'prepareNewClinicalTrialInvoicing'
            },
            'clinicaltrialpayments': {
                afterrender: 'prepareNewClinicalTrialPayments'
            },
            'safetyalertreportsassessmentpanel': {
                afterrender: 'prepareSafetyalertreportsassessment'
            },
            
            'preclinicaltrialassessment': {
                afterrender: 'prepareNewClinicalTrialAssessment'
            },
          
            
            'clinicaltrialassessment': {
                afterrender: 'prepareNewClinicalTrialAssessment'
            }, 
            'clinicaltrialscreening': {
                afterrender: 'prepareNewClinicalTrialAssessment'
            },
            
            'progressreportassessment': {
                afterrender: 'prepareCtrProgressReportAssessment'
            },
            'clinicaltrialauditing': {
                afterrender: 'prepareNewClinicalTrialAuditing'
            },
            'clinicaltrialmanagermeeting': {
                afterrender: 'prepareNewClinicalTrialManagerMeeting'
            },
            'clinicaltrialrecommreview': {
                afterrender: 'prepareNewClinicalTrialRecommReview'
            },
            'clinicaltrialapprovals': {
                afterrender: 'prepareNewClinicalTrialApprovals'
            },
            'clinicaltrialcommunication': {
                afterrender: 'prepareNewClinicalTrialCommunication'
            },
            //NEW
            'newclinicaltrialreceiving': {
                afterrender: 'prepareNewClinicalTrialReceiving'
            },
            'preclinicaltrialreceivingwizard': {
                afterrender: 'prepareNewClinicalTrialReceiving'
            },
            
            //AMENDMENT
            'amendmentclinicaltrialreceiving': {
                afterrender: 'prepareNewClinicalTrialReceiving'
            },
            'receivingsafetyalertreportswizard': {
                afterrender: 'prepareReceivingSafetyAlertReportsWizard'
            },
            
            //ONLINE
            'clinicaltrialonlinepreviewpnl': {
                afterrender: 'prepareOnlineClinicalTrialPreview'
            },'clinicaltrialprogressrptonlinepreviewpnl': {
                afterrender: 'prepareOnlineClinicalTrialProgressRptPreview'
            },
            'clinicaltrialonlineregistrypreviewpnl': {
                afterrender: 'prepareOnlineClinicalTrialRegistryPreview'
            },
            //COMPARE
            'clinicaltrialcomparepanel': {
                afterrender: 'prepareClinicalTrialComparePreview'
            },
            //SAVE
            'receivingsafetyalertreportswizard button[name=save_btn]': {//new
                click: 'saveReceivingSafetyAlertReportsDetails'
            },
            'safetyalertreportsassessmentappmoredetailswizard button[name=save_btn]': {//new
                click: 'saveSafetyalertReportsassessmentappmoredetails'
            },
            'newclinicaltrialreceivingwizard button[name=save_btn]': {//new
                click: 'saveClinicalTrialNewReceivingBaseDetails'
            },
            'preclinicaltrialreceivingwizard button[name=save_btn]': {//new
                click: 'saveClinicalTrialNewReceivingBaseDetails'
            },
            'amendmentclinicaltrialreceivingwizard button[name=save_btn]': {//amendment
                click: 'saveClinicalTrialAmendmentReceivingBaseDetails'
            },
            'preclinicaltrialreceivingwizard button[name=save_clinicaltrial_details_btn]': {//new
                click: 'saveNewApplicationClinicalTrialDetails'
            },


            
            'newclinicaltrialreceivingwizard button[name=save_clinicaltrial_details_btn]': {//new
                click: 'saveNewApplicationClinicalTrialDetails'
            },
            'amendmentclinicaltrialreceivingwizard button[name=save_clinicaltrial_details_btn]': {//amendment
                click: 'saveClinicalTrialAmendmentReceivingBaseDetails'
            }, 'clinicaltrialappmoredetailswizard button[name=save_btn]': {//more details win wizard
                click: 'updateClinicalTrialNewReceivingBaseDetails'
            },'ctrprogressreportappmoredetailswizard button[name=save_clinicaltrial_details_btn]': {//more details win wizard
                click: 'updateProgressReportingBaseDetails'
            },
            'clinicaltrialappmoredetailswizard button[name=save_clinicaltrial_details_btn]': {
                click: 'updateNewApplicationClinicalTrialDetails'
            },'clinicaltrialappmoredetailswizard button[name=save_other_details_btn]': {
                click: 'updateNewApplicationClinicalTrialOtherDetails'
            },
            'newclinicaltrialreceivingwizard button[name=save_other_details_btn]': {
                click: 'saveNewApplicationClinicalTrialOtherDetails'
            },
            
            //end
            'clinicaltrialpersonnelgrid': {
                itemdblclick: 'onClinicalTrialPersonnelDbClick'
            },
            'gcpclinicaltrialsselectiongrid': {
                itemdblclick: 'OnGcpclinicalTrialsSelectionDBclick'
            },
            
            //Submission
            //COMMON
            'clinicaltrialassessmentpanel button[name=process_submission_btn]': {
                click: 'showNewAssessmentApplicationSubmissionWin'
            },
            'clinicaltrialassessmentpanel button[name=process_submission_btn]': {
                click: 'showNewAssessmentApplicationSubmissionWin'
            },
            'clinicaltrialscreeningpanel button[name=process_submission_btn]': {
                click: 'showNewScreeningApplicationSubmissionWin'
                
            },
            
            'preclinicaltrialassessmentpanel button[name=process_submission_btn]': {
                click: 'showNewAssessmentApplicationSubmissionWin'
            },
            
            'progressreportassessmentpanel button[name=process_submission_btn]': {
                click: 'showNewAssessmentApplicationSubmissionWin'
            },
            
            'clinicaltrialauditingpanel button[name=process_submission_btn]': {
                click: 'showNewAuditingApplicationSubmissionWin'
            },
           
            'clinicaltrialmanagerquerygrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'clinicaltrialmanagerprecheckingquerygrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'clinicaltrialmanagerqueryresponsegrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            //NEW
            'newclinicaltrialreceivingwizard button[name=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin'
            },
            'newclinicaltrialreceivingwizard button[name=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin'
            },
            'queryResponseclinicaltrialwizard button[name=process_submission_btn]': {
                click: 'showQueryRespsonseReceivingApplicationSubmissionWin'
            },
            
            'preclinicaltrialreceivingwizard button[name=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin'
            },
            'receivingsafetyalertreportswizard button[name=process_submission_btn]': {
                click: 'showNewSaftyAlertReceivingAppSubmissionWin'
            },
            
            //AMENDMENT
            'amendmentclinicaltrialreceivingwizard button[name=process_submission_btn]': {
                click: 'showAmendmentReceivingApplicationSubmissionWin'
            },
            //end
            'parmeetingparticipantsgrid button[name=save_selected]': {
                click: 'addTcMeetingParticipants'
            },
            //More details
            //New
            'newclinicaltrialinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            'newclinicaltrialpaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            'newclinicaltrialassessmentpanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },  'newclinicaltrialassessmentpanel button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            'newclinicaltrialauditingpanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            //Amendments
            'amendmentclinicaltrialinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            'amendmentclinicaltrialpaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            'amendmentclinicaltrialassessmentpanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            'amendmentclinicaltrialauditingpanel form toolbar button[name=more_app_details]': {
                click: 'showClinicalTrialApplicationMoreDetails'
            },
            //end
            'clinicaltrialsselectiongrid': {
                itemdblclick: 'onClinicalTrialSelectionListDblClick'
            },
            'clinicaltrialauditingpanel toolbar menu menuitem[name=prev_uploads]': {
                click: 'showPreviousUploadedDocs'
            },'ctrgcpinspectionprocessgrid button[action=search_premise]': {
                click: 'showCTRGcpInspectionSelection'
            },'ctrgcpinspectionscheduledetailsfrm button[name=save_btn]': {
                click: 'saveGCPInspectionDetails'
            },'ctrgcpinspectionschedulingpanel': {
                afterrender: 'prepareGCPinspectionschedulingpanel'
            },
            'ctrgcoinspectionscheduleapproval': {
                afterrender: 'prepareGCPinspectionschedulingpanel'
            },
            'ctrgcpinspection': {
                afterrender: 'prepareGCPinspectionschedulingpanel'
            }, 'ctrgcpapproval': {
                afterrender: 'prepareGCPinspectionschedulingpanel'
            },
            'ctrgcpletterofcomplianceissuance': {
                afterrender: 'prepareGCPinspectionschedulingpanel'
            },

            
            'ctrgcpmanagernpsectionreview': {
                afterrender: 'prepareGCPinspectionschedulingpanel'
            },
            'ctrgcpinspectionschedulegrid': {
                refresh: 'refreshctrgcpinspectionschedulegrid'
            },
            'ctrgcpletterofcomplianceissuancegrid': {
                refresh: 'refreshctrgcpinspectionschedulegrid'
            },
            
            'ctrgcpapprovalinspectionsapplicationsgrid': {
                refresh: 'refreshctrgcpinspectionschedulegrid'
            },

           
             

            'ctrgcpinspectionsapplicationsgrid': {
                refresh: 'refreshctrgcpinspectionschedulegrid'
            },
            'ctrgcpinspectionsapplicationsgrid': {
                refresh: 'refreshctrgcpinspectionschedulegrid'
            },
            'ctrgcpinspectionschedulegrid button[action=process_submission_btn]': {
                click: 'showCTRGcpInspectionApplicationSubmissionWin'
            },

            'clinicaltrialmanagerprecheckingquerygrid': {
                refresh: 'refreshctrmanagerprecheckingquerygrid'
            },
            //other functonalities 
            'clinicaltrialonlineregistrypreviewwizard button[name=save_clinicalregdetails]': {
                click: 'funcsaveClinicalTrialRegDetails'
            },
            'clinicaltrialonlineregistrypreviewwizard button[name=save_clinicalseconaryids]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'clinicaltrialonlineregistrypreviewwizard button[name=save_clinicalstudyDesign]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'clinicaltrialonlineregistrypreviewwizard button[name=save_clinicaleligibilitycriteria]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'clinicaltrialonlineregistrypreviewwizard button[name=save_clinicalfundingsource]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'clinicaltrialonlineregistrypreviewwizard button[name=save_clinicalcollaborators]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            
            'editclinicaltrialregistrywizard button[name=save_clinicalregdetails]': {
                click: 'funcsaveClinicalTrialRegDetails'
            },
            'editclinicaltrialregistrywizard button[name=save_clinicalseconaryids]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'editclinicaltrialregistrywizard button[name=save_clinicalstudyDesign]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'editclinicaltrialregistrywizard button[name=save_clinicaleligibilitycriteria]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'editclinicaltrialregistrywizard button[name=save_clinicalfundingsource]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            },
            'editclinicaltrialregistrywizard button[name=save_clinicalcollaborators]': {
                click: 'funcsaveClinicalTrialRegotherDetails'
            }, 'pmsregisteredproductsdetailsgrid':{
                itemdblclick:'onRegisteredProductGridDoubleClick'
            },

        }
    },

    /**
     * Called when the view is created 247247  505151
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                setClinicalTrialGridsStore: 'setClinicalTrialGridsStore',
                setClinicalTrialCombosStore: 'setClinicalTrialCombosStore',
                newClinicalTrial: 'onNewClinicalTrialApplication',
                clinicalApplicationMoreDetails: 'showClinicalTrialApplicationMoreDetailsGeneric',
                showSafetyAlertApplicationMoreDetails: 'showSafetyAlertApplicationMoreDetails',
                previewClinicalTrialApplicationOnGridDetails:'previewClinicalTrialApplicationOnGridDetails',
                previewClinicalApplicationMoreDetails: 'showClinicalTrialApplicationMoreDetails',
                previewOnlineClincialTrialApplication:'previewOnlineClincialTrialApplication',
                showClinicalTrialRegistryMoreDetails:'showClinicalTrialRegistryMoreDetails',
                showGCPInspectionDetailsWizard:'showGCPInspectionDetailsWizard',
                loadClinicalTrialRegistryEditApp:'loadClinicalTrialRegistryEditApp'
            }
        }
    }, onRegisteredProductGridDoubleClick: function (view, record, item, index, e, eOpts)
    {
            var me = this,
                grid = view.grid,
                win = grid.up('window'),
                form=win.object_1,
                mask = new Ext.LoadMask({
                    msg: 'Please wait...',
                    target: win
                });
            mask.show();
            form.down('textfield[name=product_registration_no]').setValue(record.get('certificate_no'));
            form.down('textfield[name=brand_name]').setValue(record.get('brand_name'));
            form.down('textfield[name=generic_name]').setValue(record.get('common_name'));
            form.down('combo[name=dosage_form_id]').setValue(record.get('dosage_form_id'));
            form.down('textfield[name=product_strength]').setValue(record.get('product_strength'));

            form.down('textfield[name=manufacturer_id]').setValue(record.get('manufacturer_id'));

            form.down('textfield[name=marketing_authorisation_holder]').setValue(record.get('applicant_name'));

            form.down('textfield[name=marketing_authorisation_address]').setValue(record.get('applicant_name_address'));  
            form.down('textfield[name=local_technical_representative]').setValue(record.get('local_technical_representative'));  
            
            Ext.Function.defer(function () {
                mask.hide();
                    win.close();
            }, 200);
                
    },
    funcsaveClinicalTrialRegDetails:function(btn){
        var me = this,
        toaster = 1
         activeTab = btn.up('#clinicaltrialregistrypreviewpnl'),
       
        applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
        applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        detailsForm = activeTab.down('clinicaltrialregistrydetailsfrm'),
        detailsFrm = detailsForm.getForm();
    
    if (!applicant_id) {
        toastr.warning('Please select applicant!!', 'Warning Response');
        return false;
    }
   
    if (detailsFrm.isValid()) {
        Ext.getBody().mask('Please wait...');
    
        detailsFrm.submit({
            url: 'clinicaltrial/save_clinicalregdetails',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            params: {
                applicant_id: applicant_id,
                application_id: application_id,
            },
            waitMsg: 'Please wait...',
            success: function (fm, action) {
                
                Ext.getBody().unmask();
                var response = Ext.decode(action.response.responseText),
                    success = response.success,
                    message = response.message;
                if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                    
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var resp = action.result;
                toastr.error(resp.message, 'Failure Response');
                Ext.getBody().unmask();
            }
        });

         

    }

    },
    funcsaveClinicalTrialRegotherDetails:function(btn){
        var panel = btn.up('#clinicaltrialregistrypreviewpnl'),
            action_url = btn.action_url,
            panelfrm = btn.panelfrm;

            var form = panel.down(panelfrm),
            frm = form.getForm(),
            application_id = panel.down('hiddenfield[name=active_application_id]').getValue();
        if (frm.isValid()) {
            Ext.getBody().mask('Please wait...');
    
            frm.submit({
                url: action_url,
                params: {application_id: application_id},
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                    Ext.getBody().unmask();
                },
                failure: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                    success = response.success,
                    message = response.message;
                    toastr.error(message, 'Failure Response');
                    Ext.getBody().unmask();
                }
            });
        }


    },
    loadClinicalTrialRegistryEditApp:function(grid,record){
        Ext.getBody().mask('Please wait...');
        var me = this,
             mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            pnl = activeTab,
            application_status_id = record.get('application_status_id'),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            applicantFrm = pnl.down('applicantdetailsfrm'),
            detailsFrm = pnl.down('clinicaltrialregistrydetailsfrm'),
            ctrregistrysecondaryidsfrm = pnl.down('ctrregistrysecondaryidsfrm'),
            ctrregistrystudydesignfrm= pnl.down('ctrregistrystudydesignfrm'),
            ctrregistryeligibilitycriteriafrm= pnl.down('ctrregistryeligibilitycriteriafrm'),
            ctrregistryfundingsourcefrm= pnl.down('ctrregistryfundingsourcefrm'),
            ctrregistrycollaboratorssfrm= pnl.down('ctrregistrycollaboratorssfrm'),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = record.get('active_application_id]'),
            process_id = record.get('process_id]'),
            workflow_stage_id = record.get('workflow_stage_id]'),
            sub_module_id = record.get('sub_module_id]'),
            zone_fld = activeTab.down('combo[name=zone_id]');
      //set
        activeTab.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        activeTab.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('workflow_stage_id'));
        activeTab.down('hiddenfield[name=active_application_id]').setValue(record.get('active_application_id'));
        activeTab.down('hiddenfield[name=active_application_code]').setValue(record.get('application_code'));
        activeTab.down('hiddenfield[name=application_status_id]').setValue(record.get('application_status_id'));
        activeTab.down('hiddenfield[name=module_id]').setValue(record.get('module_id'));
        activeTab.down('hiddenfield[name=sub_module_id]').setValue(record.get('sub_module_id'));
        activeTab.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
        activeTab.down('textfield[name=reference_no]').setValue(record.get('reference_no'));
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });

        if (record.get('active_application_id')) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareOnlineClinicalTrialRegistryPreview',
                params: {
                    application_id: record.get('active_application_id')
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results.trial_details);
                            pnl.down('displayfield[name=application_status]').setValue(results.trial_details.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.trial_details.tracking_no);
                            applicantFrm.loadRecord(model);
                            detailsFrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.clinicaltrial_secondaryids);
                            ctrregistrysecondaryidsfrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.clinicaltrial_studydesign);
                            ctrregistrystudydesignfrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.eligibilitycriteria);
                            ctrregistryeligibilitycriteriafrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.fundingsource);
                            ctrregistryfundingsourcefrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.collaborators);
                            ctrregistrycollaboratorssfrm.loadRecord(model);

                        }
                        var win = grid.up('window');
                    win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                    
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }

      


    },
    showCTRGcpInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            applicationGrid = btn.up('grid'),
            inspectorsGrid = activeTab.down('inspectioninspectorsgrid'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            storeID = getApplicationStore(module_id, section_id,sub_module_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 2);

        if (!leadInspectorDetails) {
            Ext.getBody().unmask();
            toastr.warning('No lead inspector found!!', 'Warning Response');
            return false;
        }
        if(application_id < 1){
            //get the from the grid
            var selection_model = applicationGrid.getSelectionModel(),
                sel = selection_model.getSelection(),
                application_id = sel[0].get('id'),
                application_code = sel[0].get('application_code');

        }
        var lead_inspector_id = leadInspectorDetails.get('inspector_id'),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id,
            }];
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, extraParams, '', 'selected');
    },  refreshctrgcpinspectionschedulegrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            inspection_id = activeTab.down('hiddenfield[name=id]').getValue();

            store.getProxy().extraParams = {
                inspection_id: inspection_id,
                workflow_stage_id:workflow_stage_id
            };
    },
    refreshimpproductsgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            table_name = grid.table_name;
            store.getProxy().extraParams = {
                table_name: table_name
            };
            
    },
    
    //
    refreshctrmanagerprecheckingquerygrid: function(me) {
        var store = me.getStore(),
            table_name = me.table_name;
        store.removeAll();
        store.getProxy().extraParams = {
                table_name: table_name
            };
        
    },
    prepareGCPinspectionschedulingpanel:function(){

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('#ctrgcpinspectionschedulegrid'),
            inspectionDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            inspectorsGrid = activeTab.down('inspectioninspectorsgrid'),
            inspectorsStore = inspectorsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
       
       if (application_id) {
            applicationsStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareClinicalTrialGCPInspectionStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_clinical_trial_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            inspectionDetailsFrm.loadRecord(model);
                        }
                        applicationsStore.load();
                        inspectorsStore.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }

    },
    saveGCPInspectionDetails:function(btn){
            
        var mainTabPanel = this.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab(),
                form = activeTab.down('form'),
                toaster = btn.toaster,
                frm = form.getForm();

            if (frm.isValid()) {
                
                frm.submit({
                    url: 'clinicaltrial/saveGcpScheduleInspectionDetails',
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    waitMsg: 'Please wait...',
                    success: function (fm, action) {
                        var response = Ext.decode(action.response.responseText),
                            success = response.success,
                            message = response.message,
                            record_id = response.record_id;
                        if (success == true || success === true) {
                            form.down('hiddenfield[name=id]').setValue(record_id);
                            
                                toastr.success(message, "Success Response");
                            
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (fm, action) {
                        var resp = action.result;
                        toastr.error(resp.message, 'Failure Response');
                    }
                });
            } else {
                toastr.warning('Fill all required fields!!', 'Warning Response');
                return false;
            }


    },showCTRGcpInspectionSelection:function(btn){
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
            id = activeTab.down('hiddenfield[name=id]').getValue();
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

        if(id != ''){
            var childObject = Ext.widget(childXtype);
            childObject.down('hiddenfield[name=section_id]').setValue(section_id);
            funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
        }
        else{
            toastr.warning('Please save GCP Inspection Details before Registered Clinical Trial Selection!!', 'Warning Response');
        }
        

    },
    showClinicalTrialRegistryMoreDetails:function(item){
         var isReadOnly = true,
            me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid = btn.up('grid');

            this.previewOnlineClincialTrialApplication(grid,record);
Ext.getBody().unmask();
    },
    previewOnlineClincialTrialApplication: function (view, record) {
        var grid = view.grid,
        ref_no = record.get('reference_no'),
        application_id = record.get('active_application_id'),
        module_id = record.get('module_id'),
        sub_module_id = record.get('sub_module_id'),
        section_id = record.get('section_id'),
        application_code = record.get('application_code'),
        application_status_id = record.get('application_status_id'),
        status_type_id = record.get('status_type_id');
        panel_width = '80%';
        if(sub_module_id == 23){
            var onlinePanel = Ext.widget('clinicaltrialprogressrptonlinepreviewpnl'),
                wizardPnl=onlinePanel.down('clinicaltrialprogressrptonlinepreviewwizard');

        }
        else if( sub_module_id == 56){
            var onlinePanel = Ext.widget('clinicaltrialonlineregistrypreviewpnl'),
              wizardPnl=onlinePanel.down('clinicaltrialonlineregistrypreviewwizard');
panel_width = '95%';
        }
        else{
            var onlinePanel = Ext.widget('clinicaltrialonlinepreviewpnl'),
              wizardPnl=onlinePanel.down('clinicaltrialonlinepreviewwizard');

            if (status_type_id == 2 || status_type_id === 2 || status_type_id == 3 || status_type_id === 3) {//pre checking and manager query response
                wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
            }
           
            onlinePanel.down('clinicaltrialsponsorfrm').down('button[action=search_btn]').setDisabled(true);
            onlinePanel.down('clinicaltrialinvestigatorfrm').down('button[action=search_btn]').setDisabled(true);

        }
        docsGrid = onlinePanel.down('clinicaltrialonlinedocuploadsgenericgrid');

        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        onlinePanel.down('combo[name=zone_id]').setReadOnly(true);
        onlinePanel.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);

        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    funcShowCustomizableWindow(ref_no, panel_width, onlinePanel, 'customizablewindow');
    },
    setClinicalTrialGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.clinicalTrial.ClinicalTrialGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
		
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setClinicalTrialCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.clinicalTrial.ClinicalTrialComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    clinicalTrialHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('clinicaltrialdashwrapper');
        if (!dashboardWrapper.down('clinicaltrialdash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'clinicaltrialdash'});
        }
    },
    pharmacovigilancereportingHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('pharmacovigilancereportingdashwrapper');
        if (!dashboardWrapper.down('pharmacovigilancereportingdash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'pharmacovigilancereportingdash'});
        }
    },
    
    onNewClinicalTrialApplication: function (sub_module_id, wrapper_xtype) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);

        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.initialAppStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },

    //NEW
    onPrevCardClick: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizard_pnl = btn.wizard_pnl,
            wizardPnl = activeTab.down(wizard_pnl);
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(), 
            wizard_pnl = btn.wizard_pnl,
            wizardPnl = activeTab.down(wizard_pnl);
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },

    navigate: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            max_step = button.max_step,
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 1 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
                model.set('atBeginning', true);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        
        if (activeIndex === 1) {
            if(wizardPanel.down('button[name=save_clinicaltrial_details_btn]')){
                wizardPanel.down('button[name=save_clinicaltrial_details_btn]').setVisible(true);

            }
            
        } else {
            if(wizardPanel.down('button[name=save_clinicaltrial_details_btn]')){
                wizardPanel.down('button[name=save_clinicaltrial_details_btn]').setVisible(false);
                
            }
           
        }
       if (activeIndex === max_step) {
         
        wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            model.set('atEnd', true);
        }else {
            model.set('atEnd', false);
        }
       
    },

    quickNavigation: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizard_pnl = btn.wizard_pnl,
            max_step = btn.max_step,
            wizardPnl = activeTab.down(wizard_pnl),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
      
        if (step == 1) {
            if(wizardPnl.down('button[name=save_clinicaltrial_details_btn]')){

                wizardPnl.down('button[name=save_clinicaltrial_details_btn]').setVisible(true);

            }
        } else {
            if(wizardPnl.down('button[name=save_clinicaltrial_details_btn]')){

                wizardPnl.down('button[name=save_clinicaltrial_details_btn]').setVisible(false);
                
            }
        }
        if (step === max_step) {
            
            wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        }else {
            
            wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    //AMENDMENT
    onPrevCardClickAmendment: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('amendmentclinicaltrialreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateAmendment(btn, wizardPnl, 'prev');
    },

    onNextCardClickAmendment: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('amendmentclinicaltrialreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateAmendment(btn, wizardPnl, 'next');
    },

    navigateAmendment: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            max_step = button.max_step,
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 1 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
                model.set('atBeginning', true);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            model.set('atBeginning', true);
        } else {
            model.set('atBeginning', false);
        }
        if (activeIndex > 0) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 1) {
            wizardPanel.down('button[name=save_clinicaltrial_details_btn]').setVisible(true);
        } else {
            wizardPanel.down('button[name=save_clinicaltrial_details_btn]').setVisible(false);
        }
       if (activeIndex === max_step) {
            wizardPanel.down('button[name=save_clinicaltrial_details_btn]').setVisible(true);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigationAmendment: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('amendmentclinicaltrialreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),max_step = btn.max_step,
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 0) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 1) {
            wizardPnl.down('button[name=save_clinicaltrial_details_btn]').setVisible(true);
        } else {
            wizardPnl.down('button[name=save_clinicaltrial_details_btn]').setVisible(false);
        }
       if (step === max_step) {
            wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        }  else {
            wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    showClinicalTrialWindow: function (btn) {
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype);
        Ext.apply(childObject, {frame: 'true'});
        childObject.setUI(childObject.ui + '-framed');
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    showAddClinicalTrialRegistrySponsor: function (btn) {
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype);
        Ext.apply(childObject, {frame: 'true'});
        childObject.setUI(childObject.ui + '-framed');
        childObject.down('hiddenfield[name=personnel_type]').setValue('ctrregistrysponsor');
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    showAddClinicalSite: function (btn) {
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please save application details first!!', 'Warning Response');
            return false;
        }
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddImpProduct: function (btn) {
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            table_name = btn.table_name;
            childObject = Ext.widget(btn.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            dosageFormsStr = childObject.down('combo[name=dosage_form_id]').getStore(),
            commonNamesStr = childObject.down('combo[name=common_name_id]').getStore(),
            manufacturersStr = childObject.down('combo[name=manufacturer_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageFormsStr.removeAll();
        dosageFormsStr.load({params: {filters: filters}});
        commonNamesStr.removeAll();
        commonNamesStr.load({params: {filters: filters}});
        manufacturersStr.removeAll();
        manufacturersStr.load({params: {section_id: section_id}});
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=table_name]').setValue(table_name);
        
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddImpProductIngredient: function (btn) {
        var winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            win = btn.up('window'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            id = win.down('form').down('hiddenfield[name=id]').getValue(),
            ingredientStr = childObject.down('combo[name=ingredient_id]').getStore(),
            inclusionStr = childObject.down('combo[name=inclusion_reason_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        if (!id) {
            toastr.warning('Please save product details first!!', 'Warning Response');
            return false;
        }
        ingredientStr.removeAll();
        ingredientStr.load({params: {filters: filters}});
        inclusionStr.removeAll();
        inclusionStr.load({params: {section_id: section_id}});
        childObject.down('hiddenfield[name=product_id]').setValue(id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showEditImpProductIngredient: function (item, record) {
        var winTitle = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(item.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            ingredientStr = childObject.down('combo[name=ingredient_id]').getStore(),
            inclusionStr = childObject.down('combo[name=inclusion_reason_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        ingredientStr.removeAll();
        ingredientStr.load({params: {filters: filters}});
        inclusionStr.removeAll();
        inclusionStr.load({params: {section_id: section_id}});
        childObject.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddClinicalTrialPersonnel: function (btn) {
        var form = btn.up('form'),
            personnel_type = form.down('hiddenfield[name=personnel_type]').getValue(),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=personnel_type]').setValue(personnel_type);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showAddClinicalTrialOtherInvestigator: function (btn) {
        var grid = btn.up('grid'),
            personnel_type = btn.personnel_type,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=personnel_type]').setValue(personnel_type);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    saveSafetyalertReportsassessmentappmoredetails:function(btn){
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            wizard_pnl = btn.up(btn.wizard);
            process_id = wizard_pnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = wizard_pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = wizard_pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = wizard_pnl.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = wizard_pnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            detailsForm = wizard_pnl.down('safetyalertreportsdetailsfrm'),
            detailsFrm = detailsForm.getForm(),
            application_id = wizard_pnl.down('hiddenfield[name=application_id]').getValue();
            Ext.getBody().mask('Please wait...');
        
            if (detailsFrm.isValid()) {
                        
                        detailsFrm.submit({
                            url: 'pharmacovigilancereporting/saveReceivingSafetyAlertReportsDetails',
                            headers: {
                                'Authorization': 'Bearer ' + access_token,
                                'X-CSRF-Token': token
                            },
                            params: {
                                process_id: process_id,
                                workflow_stage_id: workflow_stage_id,
                                application_id: application_id,
                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                section_id: section_id
                            },
                            waitMsg: 'Please wait...',
                            success: function (fm, action) {
                                var response = Ext.decode(action.response.responseText),
                                    success = response.success,
                                    message = response.message;
                                if (success == true || success === true) {
                                    
                                    toastr.success(message, 'Response');
                                    
                                } else {
                                    toastr.error(message, 'Failure Response');
                                }
                                Ext.getBody().unmask();
                            },
                            failure: function (fm, action) {
                                var resp = action.result;
                                toastr.error(resp.message, 'Failure Response');
                                Ext.getBody().unmask();
                            }
                        });
                    } else {
                        Ext.getBody().unmask();
                        toastr.warning('Fill all required fields!!', 'Warning Response');
                        return;
                    }

    },
    saveReceivingSafetyAlertReportsDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            detailsForm = activeTab.down('safetyalertreportsdetailsfrm'),
            detailsFrm = detailsForm.getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        Ext.getBody().mask('Please wait...');
        
        if (detailsFrm.isValid()) {
                    
                    detailsFrm.submit({
                        url: 'pharmacovigilancereporting/saveReceivingSafetyAlertReportsDetails',
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        params: {
                            process_id: process_id,
                            workflow_stage_id: workflow_stage_id,
                            application_id: application_id,
                            application_code: application_code,
                            module_id: module_id,
                            sub_module_id: sub_module_id,
                            section_id: section_id
                        },
                        waitMsg: 'Please wait...',
                        success: function (fm, action) {
                            var response = Ext.decode(action.response.responseText),
                                success = response.success,
                                message = response.message,
                                record_id = response.record_id,
                                ref_no = response.ref_no,
                                tracking_no = response.tracking_no,
                                application_code = response.application_code;
                            if (success == true || success === true) {
                               // if(application_id >0){
                                    activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                                    activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                                    activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                                    activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);

                              //  }
                                
                                toastr.success(message, 'Response');
                                
                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                            Ext.getBody().unmask();
                        },
                        failure: function (fm, action) {
                            var resp = action.result;
                            toastr.error(resp.message, 'Failure Response');
                            Ext.getBody().unmask();
                        }
                    });
                } else {
                    Ext.getBody().unmask();
                    toastr.warning('Fill all required fields!!', 'Warning Response');
                    return;
                }

    },
    saveClinicalTrialNewReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            zone_id = zone_fld.getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue();
        if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            url: 'clinicaltrial/saveNewReceivingBaseDetails',
            waitMsg: 'Please wait...',
            params: {
                process_id: process_id,
                workflow_stage_id: workflow_stage_id,
                application_id: application_id,
                applicant_id: applicant_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                zone_id: zone_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    record_id = resp.record_id,
                    ref_no = resp.ref_no,
                    application_code = resp.application_code;
                if (success == true || success === true) {
                    if (toaster == 1 || toaster === 1) {
                        toastr.success(message, "Success Response");
                        zone_fld.setReadOnly(true);
                        activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                        activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                        activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(resp.tracking_no);
                    }
                } else {
                    toastr.error(message, "Failure Response");
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                toastr.error(message, "Failure Response");
            }
        });

    },

    updateClinicalTrialNewReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            wizardPnl = btn.up('panel'),
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=application_id]').getValue(),
            zone_id = activeTab.down('combo[name=zone_id]').getValue(),
            applicantDetailsForm = wizardPnl.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            action_url = 'clinicaltrial/saveNewReceivingBaseDetails';
        if (sub_module_id == 11 || sub_module_id === 11) {
            action_url = 'clinicaltrial/saveAmendmentReceivingBaseDetails';
        }
        else if(sub_module_id == 23){
            action_url = 'clinicaltrial/saveProgressReportingBaseDetails';

        }
        if(sub_module_id != 23){
            if (!zone_id) {
                toastr.warning('Please select zone!!', 'Warning Response');
                return false;
            }
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        Ext.Ajax.request({
            url: action_url,
            waitMsg: 'Please wait...',
            params: {
                process_id: process_id,
                workflow_stage_id: workflow_stage_id,
                application_id: application_id,
                applicant_id: applicant_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                zone_id: zone_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    if (toaster == 1 || toaster === 1) {
                        toastr.success(message, "Success Response");
                    }
                } else {
                    toastr.error(message, "Failure Response");
                }
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                toastr.error(message, "Failure Response");
            }
        });
    },

    saveClinicalTrialAmendmentReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            previous_id = activeTab.down('hiddenfield[name=previous_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            zone_id = zone_fld.getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            studySitesGrid = activeTab.down('clinicaltrialstudysitesgrid'),
            investigatorsGrid = activeTab.down('clinicaltrialotherinvestigatorsgrid'),
            impProductsGrid = activeTab.down('impproductsgrid');
        if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            url: 'clinicaltrial/saveAmendmentReceivingBaseDetails',
            waitMsg: 'Please wait...',
            params: {
                process_id: process_id,
                workflow_stage_id: workflow_stage_id,
                application_id: application_id,
                applicant_id: applicant_id,
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                zone_id: zone_id,
                previous_id: previous_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    record_id = resp.record_id,
                    ref_no = resp.ref_no,
                    application_code = resp.application_code;
                if (success == true || success === true) {
                    if (toaster == 1 || toaster === 1) {
                        toastr.success(message, "Success Response");
                        zone_fld.setReadOnly(true);
                        activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                        activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                        activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                        activeTab.down('button[action=search_application]').setDisabled(true);
                        studySitesGrid.getStore().load();
                        investigatorsGrid.getStore().load();
                        impProductsGrid.getStore().load();
                    }
                } else {
                    toastr.error(message, "Failure Response");
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                toastr.error(message, "Failure Response");
            }
        });
    },

    saveNewApplicationClinicalTrialDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            zone_id = zone_fld.getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue();

            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            detailsForm = activeTab.down('clinicaltrialdetailsfrm'),
            detailsFrm = detailsForm.getForm(),
            sponsorForm = activeTab.down('clinicaltrialsponsorfrm'),
            sponsor_id = sponsorForm.down('hiddenfield[name=id]').getValue(),
            investigatorForm = activeTab.down('clinicaltrialinvestigatorfrm'),
            investigator_id = investigatorForm.down('hiddenfield[name=id]').getValue();

        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }

        if (detailsFrm.isValid()){
            if (!sponsor_id) {
                toastr.warning('Select Sponsor!!', 'Warning Response');
                return;
            }
            if (!investigator_id) {
                toastr.warning('Select Principal Investigator!!', 'Warning Response');
                return;
            }
            detailsFrm.submit({
                url: 'clinicaltrial/saveNewReceivingBaseDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
                    sponsor_id: sponsor_id,
                    investigator_id: investigator_id
                },
                
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id,
                        ref_no = response.ref_no,tracking_no = response.tracking_no,
                        application_code = response.application_code;

                    if (success == true || success === true) {
                     
                            toastr.success(message, "Success Response");
                        
                        zone_fld.setReadOnly(true);
                        activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                        activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                        activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                        activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);

                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return;
        }
    },

    updateNewApplicationClinicalTrialDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            win = btn.up('#clinicaltrialappmoredetailswizard'),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            detailsForm = win.down('clinicaltrialdetailsfrm'),
            detailsFrm = detailsForm.getForm(),
            sponsorForm = win.down('clinicaltrialsponsorfrm'),
            sponsor_id = sponsorForm.down('hiddenfield[name=id]').getValue(),
            investigatorForm = win.down('clinicaltrialinvestigatorfrm'),
            investigator_id = investigatorForm.down('hiddenfield[name=id]').getValue();
        if (detailsFrm.isValid()) {
            if (!sponsor_id) {
                toastr.warning('Select Sponsor!!', 'Warning Response');
                return;
            }
            if (!investigator_id) {
                toastr.warning('Select Principal Investigator!!', 'Warning Response');
                return;
            }
            detailsFrm.submit({
                url: 'clinicaltrial/saveNewApplicationClinicalTrialDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_id: application_id,
                    sponsor_id: sponsor_id,
                    investigator_id: investigator_id
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return;
        }
    },
    updateProgressReportingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            win = btn.up('#ctrprogressreportappmoredetailswizard'),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            detailsForm = win.down('clinicaltrialsprogressrptdetailsfrm'),
            detailsFrm = detailsForm.getForm();
        if (detailsFrm.isValid()) {
           
            detailsFrm.submit({
                url: 'clinicaltrial/saveProgressReportingBaseDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_id: application_id
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return;
        }
    },
    
    saveNewApplicationClinicalTrialOtherDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            otherDetailsForm = activeTab.down('clinicaltrialotherdetailsfrm'),
            otherDetailsFrm = otherDetailsForm.getForm();
        if (otherDetailsFrm.isValid()) {
            otherDetailsFrm.submit({
                url: 'clinicaltrial/saveNewApplicationClinicalTrialOtherDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_id: application_id
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return;
        }
    },

    updateNewApplicationClinicalTrialOtherDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=application_id]').getValue(),
            otherDetailsForm = win.down('clinicaltrialotherdetailsfrm'),
            otherDetailsFrm = otherDetailsForm.getForm();
        if (otherDetailsFrm.isValid()) {
            otherDetailsFrm.submit({
                url: 'clinicaltrial/saveNewApplicationClinicalTrialOtherDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_id: application_id
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            return;
        }
    },

    //Prepare ... Online
    prepareOnlineClinicalTrialPreview: function (pnl) {
        // Ext.getBody().mask('Please wait...');
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm'),
            detailsFrm = pnl.down('clinicaltrialdetailsfrm'),
            sponsorFrm = pnl.down('clinicaltrialsponsorfrm'),
            investigatorFrm = pnl.down('clinicaltrialinvestigatorfrm'),
            application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue(),
            checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore(),
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: pnl
                }
            );
        mask.show();
        checklistTypesStr.removeAll();
        checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareOnlineClinicalTrialPreview',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        sponsorDetails = resp.sponsorDetails,
                        investigatorDetails = resp.investigatorDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            pnl.down('combo[name=zone_id]').setValue(results.zone_id);
                            pnl.down('displayfield[name=application_status]').setValue(results.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            applicantFrm.loadRecord(model);
                            detailsFrm.loadRecord(model);
                        }
                        if (sponsorDetails) {
                            var model2 = Ext.create('Ext.data.Model', sponsorDetails);
                            sponsorFrm.loadRecord(model2);
                        }
                        if (investigatorDetails) {
                            var model3 = Ext.create('Ext.data.Model', investigatorDetails);
                            investigatorFrm.loadRecord(model3);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },
    prepareOnlineClinicalTrialRegistryPreview: function (pnl) {
        // Ext.getBody().mask('Please wait...');
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm'),
            detailsFrm = pnl.down('clinicaltrialregistrydetailsfrm'),
            ctrregistrysecondaryidsfrm = pnl.down('ctrregistrysecondaryidsfrm'),
            ctrregistrystudydesignfrm= pnl.down('ctrregistrystudydesignfrm'),
            ctrregistryeligibilitycriteriafrm= pnl.down('ctrregistryeligibilitycriteriafrm'),
            ctrregistryfundingsourcefrm= pnl.down('ctrregistryfundingsourcefrm'),
            ctrregistrycollaboratorssfrm= pnl.down('ctrregistrycollaboratorssfrm'),
            application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue();
            checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore();
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: pnl
                }
            );
        mask.show();
        checklistTypesStr.removeAll();
        checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
       
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareOnlineClinicalTrialRegistryPreview',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results.trial_details);
                            pnl.down('displayfield[name=application_status]').setValue(results.trial_details.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.trial_details.tracking_no);
                            applicantFrm.loadRecord(model);
                            detailsFrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.clinicaltrial_secondaryids);
                            ctrregistrysecondaryidsfrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.clinicaltrial_studydesign);
                            ctrregistrystudydesignfrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.eligibilitycriteria);
                            ctrregistryeligibilitycriteriafrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.fundingsource);
                            ctrregistryfundingsourcefrm.loadRecord(model);
                            
                            var model = Ext.create('Ext.data.Model', results.collaborators);
                            ctrregistrycollaboratorssfrm.loadRecord(model);

                        }
                        
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },
    prepareOnlineClinicalTrialProgressRptPreview: function (pnl) {
        // Ext.getBody().mask('Please wait...');
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm'),
            detailsFrm = pnl.down('clinicaltrialsprogressrptdetailsfrm'),
           application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue(),
            checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore(),
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: pnl
                }
            );
        mask.show();
        checklistTypesStr.removeAll();
        checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareOnlineClinicalTrialProgressRptPreview',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            pnl.down('combo[name=zone_id]').setValue(results.zone_id);
                            pnl.down('displayfield[name=application_status]').setValue(results.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            applicantFrm.loadRecord(model);
                            detailsFrm.loadRecord(model);
                        }
                       
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },
    prepareReceivingSafetyAlertReportsWizard: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            detailsFrm = activeTab.down('safetyalertreportsdetailsfrm'),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();

        if(activeTab.down('combo[name=applicable_checklist]')){

           var app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore();
           app_check_types_store.removeAll();
           app_check_types_store.load({
               params: {
                   process_id: process_id,
                   workflow_stage: workflow_stage_id
               }
           });
        }
       
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'pharmacovigilancereporting/prepareReceivingSafetyAlertReportsStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);

                            detailsFrm.loadRecord(model);
                        }
                        
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    //Prepare ... New
    prepareNewClinicalTrialReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            sponsorFrm = activeTab.down('clinicaltrialsponsorfrm'),
            investigatorFrm = activeTab.down('clinicaltrialinvestigatorfrm'),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]');

        if(activeTab.down('combo[name=applicable_checklist]')){

           var app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore();
           app_check_types_store.removeAll();
           app_check_types_store.load({
               params: {
                   process_id: process_id,
                   workflow_stage: workflow_stage_id
               }
           });
        }
       
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_code) {
            zone_fld.setReadOnly(true);
            if (sub_module_id == 11 || sub_module_id === 11) {
                activeTab.down('button[action=search_application]').setDisabled(true);
            }
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareNewClinicalTrialReceivingStage',
                params: {
                    application_id: application_id,
                    application_code:application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        sponsorDetails = resp.sponsorDetails,
                        investigatorDetails = resp.investigatorDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            zone_fld.setValue(results.zone_id);
                            applicantFrm.loadRecord(model);
                            detailsFrm.loadRecord(model);
                        }
                        if (sponsorDetails) {
                            var model2 = Ext.create('Ext.data.Model', sponsorDetails);
                            sponsorFrm.loadRecord(model2);
                        }
                        if (investigatorDetails) {
                            var model3 = Ext.create('Ext.data.Model', investigatorDetails);
                            investigatorFrm.loadRecord(model3);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareNewClinicalTrialInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        premise_details.setFieldLabel('Clinical Trial Details');
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareNewClinicalTrialInvoicingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_clinical_trial_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        isLocked = results.isLocked,
                        is_fast_track = results.is_fast_track;
                    if (success == true || success === true) {
                        activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        
                        applicant_details.setValue(results.applicant_details);
                        premise_details.setVisible(true);
                        premise_details.setValue(results.trial_details);
                       
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    prepareNewGmpPayments: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        
       
        activeTab.down('button[name=process_submission_btn]').setVisible(true);
        
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'premiseregistration/prepareNewPremisePaymentStage',
                url: 'gmpapplications/prepareNewGmpPaymentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_gmp_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        balance = resp.balance,
                        invoice_amount = resp.invoice_amount,
                        results = resp.results,
                        txt;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.manufacturing_site_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                            txt = ' (Not Paid)';
                        } else if (parseFloat(balance) > 0) {
                            txt = ' (Over-Paid)';
                        } else if (parseFloat(balance) < 0) {
                            txt = ' (Under-Paid)';
                        } else {
                            txt = ' (Cleared)';
                        }
                        applicant_details.setValue(results.applicant_details);

                        product_details.setValue(results.product_details);

                        running_balance.setValue(balance + txt);
                       
                        if (module_id == 1 || module_id === 1) {
                            product_details.setVisible(true);
                            product_details.setValue(results.product_details);
                        }

                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    prepareNewClinicalTrialPayments: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           
            running_balance = activeTab.down('displayfield[name=running_balance]'),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        
        activeTab.down('button[name=process_submission_btn]').setVisible(true);
        
        if (application_id) {
            
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareNewClinicalTrialPaymentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_clinical_trial_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        balance = resp.balance,
                        invoice_amount = resp.invoice_amount,
                        results = resp.results,
                        txt;
                    if (success == true || success === true) {
                        var module_id = results.module_id;
                        activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.manufacturing_site_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                            txt = ' (Not Paid)';
                        } else if (parseFloat(balance) > 0) {
                            txt = ' (Over-Paid)';
                        } else if (parseFloat(balance) < 0) {
                            txt = ' (Under-Paid)';
                        } else {
                            txt = ' (Cleared)';
                        }
                        applicant_details.setValue(results.applicant_details);

                        product_details.setValue(results.product_details);

                        running_balance.setValue(balance + txt);
                       
                        if (module_id == 1 || module_id === 1) {
                            product_details.setVisible(true);
                            product_details.setValue(results.product_details);
                        }

                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    
    prepareSafetyalertreportsassessment: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            detailsFrm = activeTab.down('safetyalertreportsdetailsfrm'),
            safetyalertreportsobservationsgrid= activeTab.down('safetyalertreportsobservationsgrid'),
            
            safetyalertreportsassessmentappmoredetailswizard = activeTab.down('safetyalertreportsassessmentappmoredetailswizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
            app_doc_types_store.removeAll();
            app_doc_types_store.load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'pharmacovigilancereporting/prepareSafetyalertreportsassessment',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_pharmacovigilance_reporting'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            
                            var model = Ext.create('Ext.data.Model', results);

                                detailsFrm.loadRecord(model);
                                
                                
                                safetyalertreportsassessmentappmoredetailswizard.down('hiddenfield[name=process_id]').setValue(process_id);
                                safetyalertreportsassessmentappmoredetailswizard.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                                safetyalertreportsassessmentappmoredetailswizard.down('hiddenfield[name=application_id]').setValue(application_id);
                                safetyalertreportsassessmentappmoredetailswizard.down('hiddenfield[name=application_code]').setValue(application_code);
                                safetyalertreportsassessmentappmoredetailswizard.down('hiddenfield[name=module_id]').setValue(module_id);
                                safetyalertreportsassessmentappmoredetailswizard.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                                safetyalertreportsassessmentappmoredetailswizard.down('hiddenfield[name=section_id]').setValue(section_id);

                                safetyalertreportsobservationsgrid.down('hiddenfield[name=application_code]').setValue(sub_module_id);
                                safetyalertreportsobservationsgrid.down('hiddenfield[name=application_id]').setValue(section_id);
                                
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    prepareNewClinicalTrialAssessment: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            impproductsstr = Ext.getStore('impproductsstr'),
            clinicaltrialotherinvestigatorsstr = Ext.getStore('clinicaltrialotherinvestigatorsstr'),
            clinicaltrialstudysitesstr = Ext.getStore('clinicaltrialstudysitesstr'),
           
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            sponsorFrm = activeTab.down('clinicaltrialsponsorfrm'),
            investigatorFrm = activeTab.down('clinicaltrialinvestigatorfrm'),
            clinicaltrialappmoredetailswizard = activeTab.down('clinicaltrialappmoredetailswizard'),
            
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
       // premise_details.setFieldLabel('Clinical Trial Details');
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareNewClinicalTrialAssessmentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_clinical_trial_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        sponsorDetails = resp.sponsorDetails,
                        investigatorDetails = resp.investigatorDetails;
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                          
                            var model = Ext.create('Ext.data.Model', results);
                                applicantFrm.loadRecord(model);
                                detailsFrm.loadRecord(model);
                                if (sponsorDetails) {
                                    var model2 = Ext.create('Ext.data.Model', sponsorDetails);
                                    sponsorFrm.loadRecord(model2);
                                }
                                if (investigatorDetails) {
                                    var model3 = Ext.create('Ext.data.Model', investigatorDetails);
                                    investigatorFrm.loadRecord(model3);
                                }
                                applicantFrm.down('button[action=link_applicant]').setDisabled(true);
                               
                                
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=process_id]').setValue(process_id);
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=application_id]').setValue(application_id);
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=application_code]').setValue(application_code);
                                 clinicaltrialappmoredetailswizard.down('hiddenfield[name=module_id]').setValue(module_id);
                                 clinicaltrialappmoredetailswizard.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                                 clinicaltrialappmoredetailswizard.down('hiddenfield[name=section_id]').setValue(section_id);

                                 clinicaltrialstudysitesstr.load();
                                 impproductsstr.load();
                                 clinicaltrialotherinvestigatorsstr.load();

                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    prepareCtrProgressReportAssessment: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            clinicaltrialstudysitesstr = Ext.getStore('clinicaltrialstudysitesstr'),
           
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialsprogressrptdetailsfrm'),
            
            clinicaltrialappmoredetailswizard = activeTab.down('ctrprogressreportappmoredetailswizard'),
            
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
       // premise_details.setFieldLabel('Clinical Trial Details');
        
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareCtrProgressReportAssessment',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_clinical_trial_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                          
                            var model = Ext.create('Ext.data.Model', results);
                                applicantFrm.loadRecord(model);
                                detailsFrm.loadRecord(model);
                               
                                applicantFrm.down('button[action=link_applicant]').setDisabled(true);
                               
                                
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=process_id]').setValue(process_id);
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=application_id]').setValue(application_id);
                                clinicaltrialappmoredetailswizard.down('hiddenfield[name=application_code]').setValue(application_code);
                                 clinicaltrialappmoredetailswizard.down('hiddenfield[name=module_id]').setValue(module_id);
                                 clinicaltrialappmoredetailswizard.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                                 clinicaltrialappmoredetailswizard.down('hiddenfield[name=section_id]').setValue(section_id);


                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    prepareNewClinicalTrialAuditing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),

            impproductsstr = Ext.getStore('impproductsstr'),
            clinicaltrialotherinvestigatorsstr = Ext.getStore('clinicaltrialotherinvestigatorsstr'),
            clinicaltrialstudysitesstr = Ext.getStore('clinicaltrialstudysitesstr'),
           
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            sponsorFrm = activeTab.down('clinicaltrialsponsorfrm'),
            investigatorFrm = activeTab.down('clinicaltrialinvestigatorfrm'),
            clinicaltrialappmoredetailswizard = activeTab.down('clinicaltrialappmoredetailswizard'),
             
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareNewClinicalTrialAssessmentStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_clinical_trial_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        sponsorDetails = resp.sponsorDetails,
                        investigatorDetails = resp.investigatorDetails;
                        results = resp.results;
                    if (success == true || success === true) {
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);

                        var model = Ext.create('Ext.data.Model', results);
                        applicantFrm.loadRecord(model);
                        detailsFrm.loadRecord(model);
                        if (sponsorDetails) {
                            var model2 = Ext.create('Ext.data.Model', sponsorDetails);
                            sponsorFrm.loadRecord(model2);
                        }
                        if (investigatorDetails) {
                            var model3 = Ext.create('Ext.data.Model', investigatorDetails);
                            investigatorFrm.loadRecord(model3);
                        }
                        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
                      
                        clinicaltrialappmoredetailswizard.down('hiddenfield[name=process_id]').setValue(process_id);
                        clinicaltrialappmoredetailswizard.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                        clinicaltrialappmoredetailswizard.down('hiddenfield[name=application_id]').setValue(application_id);
                        clinicaltrialappmoredetailswizard.down('hiddenfield[name=application_code]').setValue(application_code);
                         clinicaltrialappmoredetailswizard.down('hiddenfield[name=module_id]').setValue(module_id);
                         clinicaltrialappmoredetailswizard.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                         clinicaltrialappmoredetailswizard.down('hiddenfield[name=section_id]').setValue(section_id);

                         clinicaltrialstudysitesstr.load();
                         impproductsstr.load();
                         clinicaltrialotherinvestigatorsstr.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareNewClinicalTrialManagerMeeting: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('clinicaltrialmanagermeetinggrid');
        this.prepareClinicalTrialMeetingDetailsGeneric(activeTab, applicationsGrid, 0);
    },

    prepareNewClinicalTrialRecommReview: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('clinicaltrialrecommreviewgrid');
        this.prepareClinicalTrialMeetingDetailsGeneric(activeTab, applicationsGrid, 1);
    },

    prepareNewClinicalTrialApprovals: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('clinicaltrialapprovalsgrid');
        this.prepareClinicalTrialMeetingDetailsGeneric(activeTab, applicationsGrid, 1);
    },

    prepareNewClinicalTrialCommunication: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('clinicaltrialcommunicationsgrid');
        this.prepareClinicalTrialMeetingDetailsGeneric(activeTab, applicationsGrid, 1);
    },

    prepareClinicalTrialMeetingDetailsGeneric: function (activeTab, applicationsGrid, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            meetingDetailsFrm = activeTab.down('form'),
            meeting_id = meetingDetailsFrm.down('hiddenfield[name=id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            participantsGrid = activeTab.down('tcmeetingparticipantsgrid'),
            participantsStore = participantsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        participantsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            meetingDetailsFrm.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
        }
        this.redoTcMeetingParticipantsGrid(participantsGrid);
        if (application_id) {
            if (!meeting_id) {
                applicationsStore.on('load', function (store, records, options) {
                    var record = store.getById(application_id),
                        rowIndex = store.indexOf(record);
                    sm.select(rowIndex, true);
                });
            }
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/prepareNewClinicalTrialManagerMeetingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_clinical_trial_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            meetingDetailsFrm.loadRecord(model);
                        }
                        applicationsStore.load();
                        participantsStore.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    //COMPARE
    prepareClinicalTrialComparePreview: function (pnl) {
        var me = this,
            portalPnl = pnl.down('clinicaltrialportalcomparepreviewpnl'),
            misPnl = pnl.down('clinicaltrialmiscomparepreviewpnl'),
            portalWizard = portalPnl.down('panel[name=wizardPanel]'),
            misWizard = misPnl.down('panel[name=wizardPanel]'),
            portalApplicantFrm = portalWizard.down('applicantdetailsfrm'),
            misApplicantFrm = misWizard.down('applicantdetailsfrm'),
            portalDetailsFrm = portalWizard.down('clinicaltrialdetailsfrm'),
            portalSponsorFrm = portalWizard.down('clinicaltrialsponsorfrm'),
            portalInvestigatorFrm = portalWizard.down('clinicaltrialinvestigatorfrm'),
            misDetailsFrm = misWizard.down('clinicaltrialdetailsfrm'),
            misSponsorFrm = misWizard.down('clinicaltrialsponsorfrm'),
            misInvestigatorFrm = misWizard.down('clinicaltrialinvestigatorfrm'),

            portal_application_id = portalPnl.down('hiddenfield[name=application_id]').getValue(),
            mis_application_id = misPnl.down('hiddenfield[name=application_id]').getValue(),
            mask = new Ext.LoadMask({
                target: pnl,
                msg: 'Please wait...'
            });
        mask.show();
        if (portal_application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'clinicaltrial/getClinicalTrialCompareDetails',
                params: {
                    portal_application_id: portal_application_id,
                    mis_application_id: mis_application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        portalResults = resp.portalResults,
                        portalSponsorDetails = resp.portalSponsorDetails,
                        portalInvestigatorDetails = resp.portalInvestigatorDetails,
                        misResults = resp.misResults,
                        misSponsorDetails = resp.misSponsorDetails,
                        misInvestigatorDetails = resp.misInvestigatorDetails;
                    if (success == true || success === true) {
                        if (portalResults) {
                            var model = Ext.create('Ext.data.Model', portalResults);
                            portalApplicantFrm.loadRecord(model);
                            portalDetailsFrm.loadRecord(model);
                        }
                        if (portalSponsorDetails) {
                            var model1 = Ext.create('Ext.data.Model', portalSponsorDetails);
                            portalSponsorFrm.loadRecord(model1);
                        }
                        if (portalInvestigatorDetails) {
                            var model2 = Ext.create('Ext.data.Model', portalInvestigatorDetails);
                            portalInvestigatorFrm.loadRecord(model2);
                        }
                        if (misResults) {
                            var model3 = Ext.create('Ext.data.Model', misResults);
                            misApplicantFrm.loadRecord(model3);
                            misDetailsFrm.loadRecord(model3);
                        }
                        if (misSponsorDetails) {
                            var model4 = Ext.create('Ext.data.Model', misSponsorDetails);
                            misSponsorFrm.loadRecord(model4);
                        }
                        if (misInvestigatorDetails) {
                            var model5 = Ext.create('Ext.data.Model', misInvestigatorDetails);
                            misInvestigatorFrm.loadRecord(model5);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mask.hide();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            mask.hide();
            //It's a new application
        }
    },
    //end

    redoTcMeetingParticipantsGrid: function (grid) {
        var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            add_btn = grid.down('button[name=add_participant]'),
            widgetCol = grid.columns[grid.columns.length - 1];
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            add_btn.setVisible(false);
            widgetCol.setHidden(true);
            widgetCol.widget.menu.items = [];
        } else {
            add_btn.setVisible(true);
            widgetCol.setHidden(false);
            widgetCol.widget.menu.items = [
                {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tc_meeting_participants',
                    storeID: 'tcmeetingparticipantsstr',
                    action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteClinicalTrialWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
            ];
        }
    },

    onClinicalTrialPersonnelDbClick: function (view, record) {
        var me = this,
            grid = view.grid,
            personnel_type = grid.down('hiddenfield[name=personnel_type]').getValue();

        if (personnel_type == 'sponsor' || personnel_type == 'investigator') {//sponsor,principal investigator
            this.addClinicalTrialSponsorInvestigator(view, record, personnel_type);
        }else if(personnel_type == 'clinical_monitor'){
            this.addClinicalMonitorDetails(view,record);
        }else if(personnel_type == 'ctrregistrysponsor'){
            this.addClinicalTrialClinicalRegistrySponsor(view, record, personnel_type);
        }
        else {//other investigators
            this.addClinicalTrialOtherInvestigator(view, record);
        }
    },
    saveGcpClinicalApplicationdetails:function(btn){
        var form = btn.up('form'),
        win = form.up('window'),
        frm = form.getForm(),
        storeID = btn.storeID,
        store = Ext.getStore(storeID);
        var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
        process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
        workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
     
        if (frm.isValid()) {
            frm.submit({
                url: 'clinicaltrial/saveGcpClinicalApplicationdetails',
                waitMsg: 'Please wait...',
                params:{
                    sub_module_id :sub_module_id,
                    process_id:process_id,
                    workflow_stage_id:workflow_stage_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }

    },
    OnGcpclinicalTrialsSelectionDBclick: function (view, record) {
        var grid = view.grid,
            application_id = record.get('id'),
            study_title = record.get('study_title'),
            application_code = record.get('application_code');

            
            
            frm = this.getCtrgcpinspectionselectionfrm(),
            win = grid.up('window'),

            store = Ext.getStore('clinicalStudySitesStr'),
           
            frm.down('hiddenfield[name=application_id]').setValue(application_id);
            frm.down('textarea[name=study_title]').setValue(study_title);
            frm.down('hiddenfield[name=application_code]').setValue(application_code);

            store.removeAll();
            store.load({
                params:{
                    application_id:application_id
                }
            });
            win.close();
    },
    
    addClinicalMonitorDetails:function(view,record){
        var personnel_id = record.get('id'),
            grid = view.grid,
            win = grid.up('window'),
            store = Ext.getStore('clinicaltrialmonitorssstr'),
            application_id = grid.down('hiddenfield[name=application_id]').getValue();
            Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            url: 'clinicaltrial/saveClinicalTrialCommonData',
            params: {
                monitor_id: personnel_id,
                table_name:'tra_clinical_trial_monitors',
                application_id: application_id 
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });        
        
    },
    addClinicalTrialClinicalRegistrySponsor:function(view,record){
        var frm_panel = this.getCtrregistrysponsorsfrm(),
            grid = view.grid,
            win = grid.up('window');

            frm_panel.down('hiddenfield[name=sponsor_id]').setValue(record.get('id'));
            frm_panel.down('hiddenfield[name=name]').setValue(record.get('name'));
            win.close();
    },
    addClinicalTrialSponsorInvestigator: function (view, record, personnel_type) {
        var me = this,
            grid = view.grid,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            win = grid.up('window'),
            form;
        if (personnel_type == 'sponsor') {//sponsor
            form = activeTab.down('clinicaltrialsponsorfrm');
        } else if (personnel_type == 'investigator') {//principal investigator
            form = activeTab.down('clinicaltrialinvestigatorfrm');
        }else if (personnel_type == 'investigator') {//principal investigator
            form = activeTab.down('clinicaltrialinvestigatorfrm');
        }else if (personnel_type == 'ctrregistrysponsor') {//principal investigator
            form = activeTab.down('clinicaltrialinvestigatorfrm');

            return
        } else {
                //other investigators
        }
        form.loadRecord(record);
        win.close();
    },
    addClinicalTrialOtherInvestigator: function (view, record) {
        var personnel_id = record.get('id'),
            grid = view.grid,
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            childObject = Ext.widget('clinicaltrialotherinvestigatorfrm');
        childObject.down('hiddenfield[name=personnel_id]').setValue(personnel_id);
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        funcShowCustomizableWindow('New Investigator', '30%', childObject, 'customizablewindow');

    },
    showNewSaftyAlertReceivingAppSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = this.validateNewSaftyAlertReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    //New
    showNewReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = this.validateNewClinicalTrialReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    showQueryRespsonseReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            valid = true,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: 12
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    validateNewSaftyAlertReceivingSubmission:function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            detailsFrm = activeTab.down('safetyalertreportsdetailsfrm'),
            screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
       
        if (!detailsFrm.isValid()) {
            toastr.warning('Please Enter All the required Clinical Trial Details!!', 'Warning Response');
            return false;
        }
       
        if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        this.saveReceivingSafetyAlertReportsDetails(btn);
        return true;

    },
    validateNewClinicalTrialReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            sponsor_id = activeTab.down('clinicaltrialsponsorfrm').down('hiddenfield[name=id]').getValue(),
            investigator_id = activeTab.down('clinicaltrialinvestigatorfrm').down('hiddenfield[name=id]').getValue(),
            screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if(activeTab.down('clinicaltrialstudysitesgrid')){

            studySitesGrid = activeTab.down('clinicaltrialstudysitesgrid');
            if (!studySitesGrid.getStore().getTotalCount() > 0) {
                toastr.warning('Please Add Study Site(s)!!', 'Warning Response');
                return false;
            }
        }
        if(activeTab.down('impproductsgrid')){

            impProductsGrid = activeTab.down('impproductsgrid');
            if (!impProductsGrid.getStore().getTotalCount() > 0) {
                toastr.warning('Please Add IMP Product(s)!!', 'Warning Response');
                return false;
            }

        }
        if (!detailsFrm.isValid()) {
            toastr.warning('Please Enter All the required Clinical Trial Details!!', 'Warning Response');
            return false;
        }
        if (!sponsor_id) {
            toastr.warning('Please Select Sponsor!!', 'Warning Response');
            return false;
        }
        if (!investigator_id) {
            toastr.warning('Please Select Principal Investigator!!', 'Warning Response');
            return false;
        }
        
        if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        this.saveClinicalTrialNewReceivingBaseDetails(btn);
        this.saveNewApplicationClinicalTrialDetails(btn);
        return true;
    },
    
    showNewScreeningApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
           
            var  validate_documentrecom = validateDocumentsSubmissonRecRecommendation(application_code);
            if(!hasQueries){
                if(!validate_documentrecom){
                    Ext.getBody().unmask();
                    toastr.warning('Please Enter The Application Documents Submission recommendation!!', 'Warning Response');
                    return false;
                }
              }
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    showNewAssessmentApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            hasEvalUploadChecklist = checkApplicationChecklistUploadDetails(application_code, module_id,sub_module_id,section_id,'',workflow_stage_id);
            if(!hasEvalUploadChecklist){
                toastr.warning('Upload the evaluation/assessment report or fill in the Evaluation checklist details(for checklist based evaluation) to proceed!!', 'Warning Response');
                Ext.getBody().unmask();
                return false;
               
            }
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },

    showNewAuditingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id),
            hasRespondedUnclosedQueries = checkApplicationRespondedUnclosedQueries(application_code, module_id),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
        if (hasRespondedUnclosedQueries > 0) {
            Ext.getBody().unmask();
            toastr.warning('Please close responded queries to proceed!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },

    showNewManagerMeetingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateManagerMeetingApplicationSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateManagerMeetingApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveTCMeetingDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            closeActiveWindow();
            valid = false;
        }
        return valid;
    },

    showManagerQueryApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagerqueryfrm', winWidth, storeID);
            
        } else {
            Ext.getBody().unmask();
        }
    },

    //Amendment
    showAmendmentReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateAmendmentClinicalTrialReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateAmendmentClinicalTrialReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            studySitesGrid = activeTab.down('clinicaltrialstudysitesgrid'),
            impProductsGrid = activeTab.down('impproductsgrid'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            sponsor_id = activeTab.down('clinicaltrialsponsorfrm').down('hiddenfield[name=id]').getValue(),
            investigator_id = activeTab.down('clinicaltrialinvestigatorfrm').down('hiddenfield[name=id]').getValue(),
            screeningGrid = activeTab.down('productscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!studySitesGrid.getStore().getTotalCount() > 0) {
            toastr.warning('Please Add Study Site(s)!!', 'Warning Response');
            return false;
        }
        if (!detailsFrm.isValid()) {
            toastr.warning('Please Enter All the required Clinical Trial Details!!', 'Warning Response');
            return false;
        }
        if (!sponsor_id) {
            toastr.warning('Please Select Sponsor!!', 'Warning Response');
            return false;
        }
        if (!investigator_id) {
            toastr.warning('Please Select Principal Investigator!!', 'Warning Response');
            return false;
        }
        if (!impProductsGrid.getStore().getTotalCount() > 0) {
            toastr.warning('Please Add IMP Product(s)!!', 'Warning Response');
            return false;
        }
        if (screeningGrid.getStore().getModifiedRecords().length > 0) {
            toastr.warning('There are unsaved screening data!!', 'Warning Response');
            return false;
        }
        this.saveClinicalTrialAmendmentReceivingBaseDetails(btn);
        this.saveNewApplicationClinicalTrialDetails(btn);
        return true;
    },

    saveTCMeetingDetails: function (btn) {
        this.fireEvent('saveTCMeetingDetails', btn);
    },

    beforeManagerMeetingAppsGridDeselect: function (sel, record, index, eOpts) {
        var grid = sel.view.grid,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_code1 = record.get('application_code'),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (application_code1 == application_code) {
            /* toastr.warning('Action not allowed on this application!!', 'Warning Response');
             return false;*/
        }
    },

    addTcMeetingParticipants: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            meeting_id = form.down('hiddenfield[name=id]').getValue(),
            store = Ext.getStore('tcmeetingparticipantsstr'),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    target: grid,
                    msg: 'Please wait...'
                }
            );
        if (!meeting_id) {
            toastr.warning('Please save meeting details first!!', 'Warning Response');
            return false;
        }
        Ext.each(selected_records, function (item) {
            var user_id = item.data.id,
                name = item.data.fullnames,
                phone = item.data.phone,
                email = item.data.email,
                obj = {
                    user_id: user_id,
                    participant_name: name,
                    phone: phone,
                    email: email
                };
            selected.push(obj);
            //selected.push(item.data.id);
        });
        mask.show();
        Ext.Ajax.request({
            url: 'clinicaltrial/syncTcMeetingParticipants',
            params: {
                selected: JSON.stringify(selected),
                meeting_id: meeting_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success || success == true || success === true) {
                    toastr.success(message, 'Success Response!!');
                    store.load();
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response!!');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.warning(message, 'Failure Response!!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showClinicalTrialApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        this.showClinicalTrialApplicationMoreDetailsGeneric(application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
    },previewClinicalTrialApplicationOnGridDetails: function (item) {
        var isReadOnly = true,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('id'),
            application_code = record.get('application_code'),
            applicant_id = record.get('applicant_id'),
            reference_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id');
            ref_no = record.get('reference_no'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

        this.showClinicalTrialApplicationMoreDetailsGeneric(application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
    },
    showGCPInspectionDetailsWizard:function (application_id,inspectiondetails_pnl, app_inspection_id,application_code,applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {

        var me = this,
                wizardPnl = Ext.widget(inspectiondetails_pnl);

            wizardPnl.setHeight(500);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
            recommendationform = wizardPnl.down('gcpinspectionrecommendationfrm'),
            recommendationfrm = wizardPnl.down('gcpinspectionrecommendationfrm').getForm();
            
            if (application_id) {
                
                Ext.Ajax.request({
                    method: 'GET',
                    url: 'clinicaltrial/getGCPInspectionRecommendationDetails',
                    params: {
                        app_inspection_id: app_inspection_id,
                        application_code: application_code
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message,
                            results = resp.results;
                        if (success == true || success === true) {
                            var model1 = Ext.create('Ext.data.Model', results);
                              
                            recommendationfrm.loadRecord(model1);
                            recommendationform.down('hiddenfield[name=application_id]').setValue(application_id);
                            if(wizardPnl.down('gcpinspectionapprovalfrm')){
                                approval_form = wizardPnl.down('gcpinspectionapprovalfrm');
                                approval_form.getForm().loadRecord(model1);
                                approval_form.down('hiddenfield[name=application_id]').setValue(application_id);
                               
                            }
                            
                            funcShowCustomizableWindow(ref_no, '85%', wizardPnl, 'customizablewindow'); 
                            //the CAPA recponses
                          

                            child = wizardPnl.down('applicationunstructuredqueriesgrid');
            
                            respCol = child.getColumnManager().getHeaderByDataIndex('last_response'),
                            managerQryCol = child.getColumnManager().getHeaderByDataIndex('manager_query_comment'),
                            managerQryRespCol = child.getColumnManager().getHeaderByDataIndex('manager_queryresp_comment');
                            managerQryRespCol.setHidden(false);
                            
                            child.down('hiddenfield[name=application_code]').setValue(application_code);
                            child.down('hiddenfield[name=section_id]').setValue(section_id);
                            child.down('hiddenfield[name=module_id]').setValue(module_id);
                            child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                            child.down('displayfield[name=tracking_no]').setValue(ref_no);
                            child.down('displayfield[name=reference_no]').setValue(ref_no);
                            
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
                
            }
            Ext.getBody().unmask();
    },

    showSafetyAlertApplicationMoreDetails: function (application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationdetails_panel = activeTab.down('#main_processpanel').applicationdetails_panel;
            wizardPnl = Ext.widget(applicationdetails_panel);
            
          var  detailsFrm = wizardPnl.down('safetyalertreportsdetailspnl'),previewproductDocUploadsGrid = wizardPnl.down('clinicaltrialdocuploadsgenericgrid');
            
            if(wizardPnl.down('clinicaltrialdocuploadsgenericgrid')){
                previewproductDocUploadsGrid.setController('productregistrationvctr');

                previewproductDocUploadsGrid.down('hiddenfield[name=process_id]').setValue(process_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
                
            }
            
        wizardPnl.setHeight(500);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        detailsFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        }


        Ext.Ajax.request({
            method: 'GET',
            url: 'pharmacovigilancereporting/getSafetyAlertApplicationMoreDetails',
            params: {
                application_id: application_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    appDetails = resp.app_details;
                if (success == true || success === true) {
                    
                    if (appDetails) {
                        var model2 = Ext.create('Ext.data.Model', appDetails);
                        detailsFrm.loadRecord(model2);
                    }
                   
                    funcShowCustomizableWindow(ref_no, '85%', wizardPnl, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showClinicalTrialApplicationMoreDetailsGeneric: function (application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationdetails_panel = activeTab.down('#main_processpanel').applicationdetails_panel;

         //   wizardPnl = Ext.widget(applicationdetails_panel);

            if(applicationdetails_panel ==''){

                applicationdetails_panel = clinicaltrialappmoredetailswizard;

            }
             wizardPnl = Ext.create('Ext.tab.Panel', {layout: 'fit',items:[{xtype: applicationdetails_panel, title: 'Clinical Application Details '}]});
          
          var  applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            detailsFrm = wizardPnl.down('clinicaltrialdetailsfrm'),
            sponsorFrm = wizardPnl.down('clinicaltrialsponsorfrm'),
            investigatorFrm = wizardPnl.down('clinicaltrialinvestigatorfrm'),
            //otherDetailsFrm = wizardPnl.down('clinicaltrialotherdetailsfrm'),
            studySitesGrid = wizardPnl.down('clinicaltrialstudysitesgrid'),
            impProductsGrid = wizardPnl.down('impproductsgrid'),
            investigatorsWinGrid = wizardPnl.down('clinicaltrialotherinvestigatorsgrid'),
            previewproductDocUploadsGrid = wizardPnl.down('clinicaltrialdocuploadsgenericgrid');
            
            if(wizardPnl.down('clinicaltrialdocuploadsgenericgrid')){
                previewproductDocUploadsGrid.setController('productregistrationvctr');

                previewproductDocUploadsGrid.down('hiddenfield[name=process_id]').setValue(process_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                previewproductDocUploadsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
                
            }
            
        wizardPnl.setHeight(500);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        detailsFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        sponsorFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        investigatorFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        studySitesGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        impProductsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        investigatorsWinGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
            //wizardPnl.down('button[name=save_btn]').setVisible(false);
            wizardPnl.down('button[name=save_clinicaltrial_details_btn]').setVisible(false);
        }


        Ext.Ajax.request({
            method: 'GET',
            url: 'clinicaltrial/getClinicalTrialApplicationMoreDetails',
            params: {
                application_id: application_id,
                applicant_id: applicant_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    applicantDetails = resp.applicant_details,
                    appDetails = resp.app_details,
                    sponsorDetails = resp.sponsor_details,
                    investigatorDetails = resp.investigator_details;
                if (success == true || success === true) {
                    if (applicantDetails) {
                        var model1 = Ext.create('Ext.data.Model', applicantDetails);
                        applicantFrm.loadRecord(model1);
                    }
                    if (appDetails) {
                        var model2 = Ext.create('Ext.data.Model', appDetails);
                        detailsFrm.loadRecord(model2);
                    }
                    if (sponsorDetails) {
                        var model3 = Ext.create('Ext.data.Model', sponsorDetails);
                        sponsorFrm.loadRecord(model3);
                    }
                    if (investigatorDetails) {
                        var model4 = Ext.create('Ext.data.Model', investigatorDetails);
                        investigatorFrm.loadRecord(model4);
                    }

                    wizardPnl.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = wizardPnl.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
                    
                    // documents_grid = Ext.widget('previewproductDocUploadsGrid');
                    wizardPnl.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});

                    documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
                    documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                    documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                    documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                    documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);   

                    funcShowCustomizableWindow(ref_no, '85%', wizardPnl, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    onClinicalTrialSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantForm = activeTab.down('applicantdetailsfrm'),
            zone_id = record.get('zone_id'),
            previous_id = record.get('previous_id'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        applicantForm.loadRecord(record);
        activeTab.down('combo[name=zone_id]').setValue(zone_id);
        activeTab.down('hiddenfield[name=previous_id]').setValue(previous_id);
        this.getApplicationClinicalTrialDetailsOnSelect(activeTab, previous_id);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    getApplicationClinicalTrialDetailsOnSelect: function (activeTab, previous_id) {
        Ext.getBody().mask('Please wait...');
        var detailsFrm = activeTab.down('clinicaltrialdetailsfrm'),
            sponsorFrm = activeTab.down('clinicaltrialsponsorfrm'),
            investigatorFrm = activeTab.down('clinicaltrialinvestigatorfrm');
        Ext.Ajax.request({
            method: 'GET',
            url: 'clinicaltrial/getClinicalTrialApplicationMoreDetails',
            waitMsg: 'Please wait...',
            params: {
                application_id: previous_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
                //'X-CSRF-Token': token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    appDetails = resp.app_details,
                    sponsorDetails = resp.sponsor_details,
                    investigatorDetails = resp.investigator_details;
                if (success == true || success === true) {
                    if (appDetails) {
                        var model = Ext.create('Ext.data.Model', appDetails);
                        detailsFrm.loadRecord(model);
                    }
                    if (sponsorDetails) {
                        var model2 = Ext.create('Ext.data.Model', sponsorDetails);
                        sponsorFrm.loadRecord(model2);
                    }
                    if (investigatorDetails) {
                        var model3 = Ext.create('Ext.data.Model', investigatorDetails);
                        investigatorFrm.loadRecord(model3);
                    }
                } else {
                    toastr.error(message, "Failure Response");
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                toastr.error(message, "Failure Response");
            }
        });
    },

    showPreviousUploadedDocs: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            target_stage = btn.target_stage,
            static_stage = getClinicalTrialModuleStaticStage(sub_module_id, section_id, target_stage);
        this.fireEvent('showPrevUploadedDocsWin', btn, section_id, module_id, sub_module_id, static_stage, application_code);
    },
    showClinicalTrialsDEtails: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel();
        var childObject = Ext.widget(childXtype);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    showGcpInspectionClincialDetails: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            inspection_id = activeTab.down('hiddenfield[name=id]').getValue();
       
        if(inspection_id < 1){
            toastr.error('Save Inspection Details to continue', "Alert");
            return;
        }
        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=inspection_id]').setValue(inspection_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
});