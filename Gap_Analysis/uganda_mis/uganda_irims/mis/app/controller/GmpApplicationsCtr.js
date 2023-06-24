/**
 * Created by Kip on 12/14/2018.
 */
Ext.define('Admin.controller.GmpApplicationsCtr', {
    extend: 'Ext.app.Controller',

    stores: [
        'Admin.store.gmpApplications.GmpAppGridAbstractStore',
        'Admin.store.gmpApplications.GmpAppComboAbstractStore',
        'Admin.store.gmpApplications.FoodGmpApplicationsStr',
        'Admin.store.gmpApplications.DrugsGmpApplicationsStr',
        'Admin.store.gmpApplications.CosmeticsGmpApplicationsStr',
        'Admin.store.gmpApplications.MedDevicesGmpApplicationsStr',
        'Admin.store.gmpApplications.GmpProductLinesStr',
        'Admin.store.gmpApplications.GmpProductLineCategoriesStr',
        'Admin.store.gmpApplications.GmpProductLineDescriptionsStr',
        'Admin.store.gmpApplications.GmpProductLineRecommendationStr',
        'Admin.store.gmpApplications.GmpProductLineStatusStr',
        'Admin.store.gmpApplications.GmpPersonnelDetailsOnlineStr',
        'Admin.store.gmpApplications.GmpOtherDetailsOnlineStr',
        'Admin.store.gmpApplications.OnlineProductLineDetailsStr',
        'Admin.store.BetaLactamSstr',
        'Admin.store.GmpProductTypeStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        },{
            ref: 'ltrfrm',
            selector: 'ltrfrm'
            
        },{
            ref: 'mansiteappmoredetailswizard',
            selector: '#mansiteappmoredetailswizard'
        }],
        control: {
            //NEW
            'newgmpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
            'newgmpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },
            'newgmpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            //RENEW
            'renewgmpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickRenewal'
            },
            'renewgmpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickRenewal'
            },
            'renewgmpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationRenewal'
            },
            //CANCELLATION
            'cancelgmpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickCancellation'
            },
            'cancelgmpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickCancellation'
            },
            'cancelgmpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationCancellation'
            },
            //ALTERATION
            'altgmpreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickAlteration'
            },
            'altgmpreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickAlteration'
            },
            'altgmpreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationAlteration'
            },
            //end
            'mansitedetailstabpnl': {
                beforetabchange: 'beforeManSiteTabChange'
            },
            //todo: Prepare main interfaces
            //SHARED
            'gmpinvoicing': {
                afterrender: 'prepareNewGmpInvoicing'
            },
            'gmppayments': {
                afterrender: 'prepareNewGmpPayments'
            },
            'gmpsmfuploads': {
                afterrender: 'prepareNewGmpSmfUploads'
            },
            'gmpdeskreviewuploads': {
                afterrender: 'prepareNewGmpSmfUploads'
            },
            'altgmpevaluation': {
                afterrender: 'prepareNewGmpSmfUploads'
            },
            'gmpdeskreviewscheduling': {
                afterrender: 'prepareNewGmpDeskReviewScheduling'
            },
            'gmpmanagerinspection': {
                afterrender: 'prepareNewGmpManagerInspection'
            },
            'newgmpprovisionalinspection': {
                afterrender: 'prepareNewProvisionalGmpInspection'
            },
            'gmpinspection': {
                afterrender: 'prepareNewGmpInspection'
            },
            'gmpscreeningpanel': {
                afterrender: 'prepareNewGmpScreening'
            },
            
            'gmpdeskreviewprocess': {
                afterrender: 'prepareNewGmpInspection'
            },
            'gmptcmeetingscheduling': {
                afterrender: 'prepareNewGmpTCMeetingScheduling'
            },
            'gmptcmeetingrecommendation': {
                afterrender: 'prepareNewGmpTCRecommendation'
            },
            'gmpapprovals': {
                afterrender: 'prepareNewGmpMainApprovals'
            },
            'newgmpconditionalapprovals': {
                afterrender: 'prepareNewGmpMainApprovals'
            },
            
            'singlegmpapproval': {
                afterrender: 'prepareNewGmpSingleApproval'
            },
            //NEW
            'newgmpreceiving': {
                afterrender: 'prepareNewGmpReceiving'
            },
            //RENEWAL
            'renewgmpreceiving': {
                afterrender: 'prepareRenewGmpReceiving'
            },
            //CANCELLATION
            'cancelgmpreceiving': {
                afterrender: 'prepareCancellationGmpReceiving'
            },
            //ALTERATION
            'altgmpreceiving': {
                afterrender: 'prepareCancellationGmpReceiving'
            },
            //ONLINE
            'newgmponlinepreviewpnl': {
                afterrender: 'prepareNewGmpOnlinePreview'
            },
            'cancelgmponlinepreviewpnl': {
                afterrender: 'prepareNewGmpOnlinePreview'
            },
            'altgmponlinepreviewpnl': {
                afterrender: 'prepareNewGmpOnlinePreview'
            },
            //COMPARE DETAILS
            'gmpcomparepanel': {
                afterrender: 'prepareGmpComparePreview'
            },
            //end
            'newgmpreceivingwizard button[name=save_btn]': {//new
                click: 'saveGmpNewReceivingBaseDetails'
            },
            'renewgmpreceivingwizard button[name=save_btn]': {//renewal
                click: 'saveGmpRenewalReceivingBaseDetails'
            },
            'cancelgmpreceivingwizard button[name=save_btn]': {//withdrawal
                click: 'saveGmpRenewalReceivingBaseDetails'
            },
            'altgmpreceivingwizard button[name=save_btn]': {//alteration
                click: 'saveGmpRenewalReceivingBaseDetails'
            },
            'foodgmptb button[name=foodGmpHomeBtn]': {
                click: 'gmpApplicationsHome'
            },
            'drugsgmptb button[name=drugsGmpHomeBtn]': {
                click: 'gmpApplicationsHome'
            },
            'cosmeticsgmptb button[name=cosmeticsGmpHomeBtn]': {
                click: 'gmpApplicationsHome'
            },
            'meddevicesgmptb button[name=meddevicesGmpHomeBtn]': {
                click: 'gmpApplicationsHome'
            },
            'foodgmpgrid': {
                refresh: 'refreshGmpApplicationsMainGrids'
            },
            'drugsgmpgrid': {
                refresh: 'refreshGmpApplicationsMainGrids'
            },
            'cosmeticsgmpgrid': {
                refresh: 'refreshGmpApplicationsMainGrids'
            },
            'meddevicesgmpgrid': {
                refresh: 'refreshGmpApplicationsMainGrids'
            }, 'searchinspectionschedulesgrid': {
                refresh: 'refreshsearchinspectionschedulesgrid'
            },

            
            'ltrfrm button[action=link_ltr]': {
                click: 'showLTRSelectionList'
            },'gmpinspectionscheduleteamfrm button[action=search_inspectionteam]': {
                click: 'showSearch_inspectionteam'
            },
            'ltrselectiongrid': {
                itemdblclick: 'onLTRSelectionListDblClick'
            },
            'searchinspectionschedulesgrid': {
                itemdblclick: 'onsearchinspectionschedulesgridDblClick'
            },
            'mansitepersonneldetailsgrid button[action=add_personnel]': {
                click: 'showAddSitePersonnelDetails'
            },
            'mansitepersonneldetailswingrid button[action=add_personnel_win]': {
                click: 'showAddSitePersonnelDetailsWin'
            },
            'mansiteotherdetailsgrid button[action=add_details]': {
                click: 'showAddSiteOtherDetails'
            },
            'mansiteotherdetailsgrid button[action=add_details_win]': {
                click: 'showAddSiteOtherDetailsWin'
            },
            
            'productlinedetailsinspectiongrid button[name=add_line]': {
                click: 'showAddGmpProductLineDetails'
            },
            'noncomplianceobservationsgrid button[name=add_observation]': {
                click: 'showAddGmpNonComplianceDetails'
            },
            'newsinglegmpapprovalpanel button[name=non_compliance]': {
                click: 'showAddGmpNonComplianceDetails'
            },
            //Submission SHARED
            'gmpsmfuploadspanel button[name=process_submission_btn]': {
                click: 'showSmfUploadsApplicationSubmissionWin'
            },
            'gmpdeskreviewuploadspanel button[name=process_submission_btn]': {
                click: 'showSmfUploadsApplicationSubmissionWin'
            },
            'gmpinspectionschedulingphysicalgrid button[action=process_submission_btn]': {
                click: 'showInspectionSchedulingApplicationSubmissionWin'
            },
            'gmpinspectionschedulingdeskreviewgrid button[action=process_submission_btn]': {
                click: 'showInspectionSchedulingApplicationSubmissionWin'
            },
            'gmpdeskreviewschedulinggrid button[action=process_submission_btn]': {
                click: 'showGmpDeskReviewSchedulingApplicationSubmissionWin'
            },
            'gmpmanagerinspectiongrid button[action=process_submission_btn]': {
                click: 'showManagerInspectionApplicationSubmissionWin'
            },
            'gmpinspectionpanel button[name=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            'gmpscreeningpanel button[name=process_submission_btn]': {
                click: 'showScreeningApplicationSubmissionWin'
            },
            
            'gmpdeskreviewprocesspanel button[name=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            'gmpprovisionalinspectionpanel button[name=process_submission_btn]': {
                click: 'showInspectionApplicationSubmissionWin'
            },
            
            /*'gmpmeetingschedulinggrid button[action=process_submission_btn]': {
                click: 'showTCMeetingSchedulingApplicationSubmissionWin'
            },'gmptcmeetingrecommendationgrid button[action=process_submission_btn]': {
                click: 'showTCMeetingReviewgApplicationSubmissionWin'
            },
            'gmptcmeetingrecommendationpanel button[name=process_submission_btn]': {
                click: 'showTCMeetingRecommendationApplicationSubmissionWin'
            },
            */
            'singlegmpapprovalpanel button[name=process_submission_btn]': {
                click: 'showSingleApprovalApplicationSubmissionWin'
            },
            'gmpmanagerquerygrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'gmpmanagerprecheckingquerygrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'gmpmanagerqueryresponsegrid button[action=process_submission_btn]': {
                click: 'showManagerQueryApplicationSubmissionWin'
            },
            'gmpcommunicationsgrid button[action=process_submission_btn]': {
                click: 'showCommunicationsApplicationSubmissionWin'
            },
            //Submission NEW
            'newgmpreceivingwizard  button[name=process_submission_btn]': {
                click: 'showNewReceivingApplicationSubmissionWin'
            },
            //Submission RENEW
            'renewgmpreceivingwizard button[name=process_submission_btn]': {
                click: 'showRenewReceivingApplicationSubmissionWin'
            },
            //Submission CANCELLATION
            'cancelgmpreceivingwizard button[name=process_submission_btn]': {
                click: 'showRenewReceivingApplicationSubmissionWin'
            },
            //Submission ALTERATION
            'altgmpreceivingwizard button[name=process_submission_btn]': {
                click: 'showRenewReceivingApplicationSubmissionWin'
            },
            //end
            'newgmpinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'newgmppaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'gmpsmfuploadspanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'gmpdeskreviewuploadspanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'gmpinspectionpanel button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'gmpscreeningpanel button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            
            'gmpdeskreviewprocesspanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'gmptcmeetingrecommendationpanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'singlegmpapprovalpanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'renewgmpinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'altgmpinvoicingpanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'renewgmppaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'altgmppaymentspanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'gmpevaluationpanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },
            'gmpprovisionalinspectionpanel form toolbar button[name=more_app_details]': {
                click: 'showGmpApplicationMoreDetails'
            },         
            'mansiteappmoredetailswizard button[name=save_btn]': {//late updates...Inspection and Com with Applicants
                click: 'updateGmpApplicationDetails'
            },
            'mansiteappmoredetailsaltwizard button[name=save_btn]': {//late updates...Inspection and Com with Applicants
                click: 'updateGmpApplicationDetails'
            },
            'newgmpinspectionpanel button[name=inspection_schedule]': {
                click: 'showGmpInspectionSchedulesBtn'
            },
            'renewgmpinspectionpanel button[name=inspection_schedule]': {
                click: 'showGmpInspectionSchedulesBtn'
            },
            'gmpproductslinkagedetailsgrid button[action=search_product]': {
                click: 'showProductsSelectionList'
            },
            'gmpproductslinkagedetailswingrid button[action=search_product]': {
                click: 'showProductsSelectionListWin'
            },
            'mansitedetailsfrm button[action=search_site]': {
                click: 'showManufacturingSitesSelectionList'
            },
            'mansitedetailsfrm button[name=search_site]': {
                click: 'showManufacturingSitesSelectionList'
            },
            'mansitesselectiongrid': {
                itemdblclick: 'onManSiteSelectionListDblClick'
            },
            'manufacturingsitesselectiongrid': {
                itemdblclick: 'onManufacturingSiteSelectionListDblClick'
            },
            'gmpinspectionschedulingphysicalgrid button[name=inspection_schedule]': {
                click: 'showGmpInspectionSchedules'
            },
            'gmpinspectionschedulingphysicalgrid button[name=assign_schedule]': {
                click: 'showGmpInspectionSchedules'
            },
            'inspectionscheduleselectiongrid button[name=sync_btn]': {
                click: 'addGmpApplicationIntoInspectionSchedule'
            },
            'gmpmeetingschedulinggrid button[name=save_btn]': {
                click: 'saveTCMeetingDetails'
            },
            'newsinglegmpapprovalpanel button[name=show_recommendation]': {
                click: 'getApplicationApprovalDetails'
            },
            'gmpdeskreviewschedulinggrid button[name=save_btn]': {
                click: 'saveDeskReviewScheduleDetails'
            },
            'newgmpdeskreviewschedulingpanel button[name=add_btn]': {
                click: 'showAddInspectionOtherDetails'
            },
            'gmpmanagerinspectionpanel button[name=add_btn]': {
                click: 'showAddInspectionOtherDetails'
            },
            'newgmpdeskreviewprocesspanel button[name=prev_uploads]': {
                click: 'showPreviousUploadedDocs'
            },
            'productlineabstractgrid button[name=prev_productline_details]': {
                click: 'showPrevProductLineDetails'
            },
            'applicationwithdrawalreasonsgrid button[name=add_reason]': {
                click: 'showAddGmpWithdrawalReason'
            },  'productlinedetailsgrid button[name=update_line]': {
                click: 'saveGmpproductlinedetails'
            },'productlinedetailsinspectiongrid button[name=update_line]': {
                click: 'saveGmpproductlinedetails'
            },
            
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                setGmpApplicationGridsStore: 'setGmpApplicationGridsStore',
                setGmpApplicationCombosStore: 'setGmpApplicationCombosStore',
                newGmpApplication: 'onNewGmpApplication',
                gmpApplicationMoreDetails: 'showGmpApplicationMoreDetailsGeneric',
                redoManSiteOtherDetailsGrid: 'redoManSiteOtherDetailsGrid',
                redoManSitePersonnelDetailsGrid: 'redoManSitePersonnelDetailsGrid',
                previewGmpOnlineApplication:'previewGmpOnlineApplication'
            }
        }
    },saveGmpproductlinedetails:function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            manufacturing_site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            productLineGrid = btn.up('grid');
        store = productLineGrid.getStore(),
        product_lines = [];
        for (var i = 0; i < store.data.items.length; i++) {
            var record = store.data.items [i],
                product_line_category = record.get('product_line_category'),
                 product_line_name = record.get('product_line_name'),
                 product_line_namecheck = record.get('product_line_namecheck'),
                 manufacturingsite_block_no = record.get('manufacturingsite_block_no'),
                 no_ofproduction_lines = record.get('no_ofproduction_lines'),
                 non_betalactam = record.get('non_betalactam'),
                 gmpproduct_type_id = record.get('gmpproduct_type_id'),
                 product_line_description = record.get('product_line_description'),
                 beta_lactam_id = record.get('beta_lactam_id'),
                 product_line_id = record.get('product_line_id'),
                 gmp_product_categories_id = record.get('gmp_product_categories_id'),
                 prodline_inspectionstatus_id = record.get('prodline_inspectionstatus_id'),

                 
                 id = record.get('id');

            var obj = {
                id: id,
                product_line_category: product_line_category,
                application_code: application_code,
                product_line_namecheck: product_line_namecheck,
                manufacturing_site_id: manufacturing_site_id,
                created_by: user_id,
                manufacturingsite_block_no: manufacturingsite_block_no,
                no_ofproduction_lines: no_ofproduction_lines,
                non_betalactam: non_betalactam,
                gmpproduct_type_id:gmpproduct_type_id,
                product_line_description:product_line_description,
                beta_lactam_id: beta_lactam_id,
                product_line_id: product_line_id,
                gmp_product_categories_id: gmp_product_categories_id,
                prodline_inspectionstatus_id:prodline_inspectionstatus_id
            };
            if (record.dirty) {
                product_lines.push(obj);
            }
        }
        if (product_lines.length < 1) {
            btn.setLoading(false);
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        product_lines = JSON.stringify(product_lines);
        Ext.Ajax.request({
            url: 'gmpapplications/saveGmpproductlinedetails',
            params: {
                application_id: application_id,
                application_code: application_code,
                manufacturing_site_id: manufacturing_site_id,
                product_lines: product_lines
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    store.load();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                btn.setLoading(false);
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.setLoading(false);
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });


    },previewGmpOnlineApplication: function (view, record) {
        console.log(record);
        var grid = view.grid,
            isReadOnly = grid.isReadOnly,
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            site_id = record.get('manufacturing_site_id'),
            status_type_id = record.get('status_type_id'),
            gmp_type_id = record.get('gmp_type_id'),
            device_type_id = record.get('device_type_id'),
            assessment_type_id = record.get('assessment_type_id'),
            onlinePanelXtype,
            wizardPnlXtype;
        if (sub_module_id == 39 || sub_module_id === 39) {//Withdrawal
            onlinePanelXtype = 'cancelgmponlinepreviewpnl';
            wizardPnlXtype = 'cancelgmponlinepreviewwizard'
        } else if (sub_module_id == 40 || sub_module_id === 40) {//Alteration
            onlinePanelXtype = 'altgmponlinepreviewpnl';
            wizardPnlXtype = 'altgmponlinepreviewwizard'
        } else {//New, Renewal
            onlinePanelXtype = 'newgmponlinepreviewpnl';
            wizardPnlXtype = 'newgmponlinepreviewwizard'
        }
        var onlinePanel = Ext.widget(onlinePanelXtype),
            wizardPnl = onlinePanel.down(wizardPnlXtype),
            
            personnelDetailsGrid = wizardPnl.down('mansitepersonneldetailsgrid'),
            siteBlockDetailsGrid = wizardPnl.down('mansiteblockdetailswingrid'),
            siteOtherDetailsGrid = wizardPnl.down('mansiteotherdetailswingrid'),
            productLineDetailsGrid = wizardPnl.down('onlineproductlinedetailsgrid'),
            productLineDetailsStr = productLineDetailsGrid.getStore(),
            docsGrid = onlinePanel.down('gmpapponlinedocuploadsgenericgrid'),
            siteDetailsFrm = onlinePanel.down('mansitedetailsfrm'),
            ltrFrm = onlinePanel.down('ltrfrm'),
            contactFrm = onlinePanel.down('premisecontactpersonfrm');

        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        siteDetailsFrm.down('button[name=search_site]').setDisabled(true);
        siteDetailsFrm.down('button[action=search_site]').setDisabled(true);
        siteDetailsFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        ltrFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        contactFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        onlinePanel.down('combo[name=gmp_type_id]').setValue(gmp_type_id);
        onlinePanel.down('combo[name=assessment_type_id]').setValue(assessment_type_id);
        onlinePanel.down('hiddenfield[name=status_type_id]').setValue(status_type_id);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {

        }
     

        if (section_id != 2) {
            productlinedetailsgrid.columns[4].setHidden(true);
            productlinedetailsgrid.columns[5].setHidden(true);
            productlinedetailsgrid.columns[6].setHidden(true);
            productlinedetailsgrid.columns[7].setHidden(true);
        }
        if (status_type_id == 2 || status_type_id === 2 || status_type_id == 3 || status_type_id === 3) {//pre checking and manager query response
            wizardPnl.down('button[name=preview_queries_btn]').setVisible(true);
        }
        personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        siteBlockDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        siteOtherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        personnelDetailsGrid.setIsOnline(1);
        siteBlockDetailsGrid.setIsOnline(1);
        siteOtherDetailsGrid.setIsOnline(1);
       
        funcShowCustomizableWindow(tracking_no, '80%', onlinePanel, 'customizablewindow');
    },

    setGmpApplicationGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.gmpApplications.GmpAppGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setGmpApplicationCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.gmpApplications.GmpAppComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    refreshsearchinspectionschedulesgrid:function(me){
        var store = me.store,
        grid = me.up('grid'),
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        store.getProxy().extraParams = {
            section_id: section_id
        };
    },
    refreshGmpApplicationsMainGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = (activeTab.down('hiddenfield[name=module_id]')) ? activeTab.down('hiddenfield[name=module_id]').getValue() : null,
            section_id = (activeTab.down('hiddenfield[name=section_id]')) ? activeTab.down('hiddenfield[name=section_id]').getValue() : null,
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null,
            gmp_type_id = (grid.down('combo[name=gmp_type_id]')) ? grid.down('combo[name=gmp_type_id]').getValue() : null;
        store.getProxy().extraParams = {
            module_id: module_id,
            section_id: section_id,
            sub_module_id: sub_module_id,
            workflow_stage_id: workflow_stage_id,
            gmp_type_id: gmp_type_id
        };
    },

    onNewGmpApplication: function (sub_module_id, wrapper_xtype, gmp_type_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id),
            gmp_type_txt,
            is_local;//for loading of countries
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        if (gmp_type_id == 1 || gmp_type_id === 1) {
            gmp_type_txt = 'Oversea GMP';
            is_local = 0;
        }
        if (gmp_type_id == 2 || gmp_type_id === 2) {
            gmp_type_txt = 'Domestic GMP';
            is_local = 1;
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

        workflowContainer.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        workflowContainer.down('displayfield[name=gmp_type_txt]').setValue(gmp_type_txt);

        //workflowContainer.down('hiddenfield[name=is_local]').setValue(is_local);
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

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
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
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === max_step) {
            
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigation: function (btn) {
        var step = btn.step,
        max_step = btn.max_step,
        wizard_pnl = btn.wizard_pnl,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
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
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == max_step) {
       
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
         
            wizardPnl.getViewModel().set('atEnd', false);
        }
        console.log(step)
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

    //RENEWAL
    onPrevCardClickRenewal: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('renewgmpreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateRenewal(btn, wizardPnl, 'prev');
    },

    onNextCardClickRenewal: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('renewgmpreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateRenewal(btn, wizardPnl, 'next');
    },

    navigateRenewal: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 3 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
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

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
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
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 4) {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigationRenewal: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('renewgmpreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 3) {
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
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 4) {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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

    //CANCELLATION
    onPrevCardClickCancellation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelgmpreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateCancellation(btn, wizardPnl, 'prev');
    },

    onNextCardClickCancellation: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelgmpreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateCancellation(btn, wizardPnl, 'next');
    },

    navigateCancellation: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 3 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
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

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
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
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 4) {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigationCancellation: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('cancelgmpreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 3) {
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
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 4) {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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

    //ALTERATION
    onPrevCardClickAlteration: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('altgmpreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateAlteration(btn, wizardPnl, 'prev');
    },

    onNextCardClickAlteration: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('altgmpreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateAlteration(btn, wizardPnl, 'next');
    },

    navigateAlteration: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 3 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
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

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
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
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 4) {
            //wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            //wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atEnd', false);
        }
    },

    quickNavigationAlteration: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('altgmpreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 3) {
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
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 4) {
            //wizardPnl.down('button[name=save_screening_btn]').setVisible(true);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            //wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
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

    gmpApplicationsHome: function (btn) {
        var me = this,
            dash_wrapper = btn.dash_wrapper,
            dashboard = btn.dashboard,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(dash_wrapper);
        if (!dashboardWrapper.down(dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: dashboard});
        }
    },

    prepareNewGmpOnlinePreview: function (pnl) {
        var me = this,
            applicantFrm = pnl.down('applicantdetailsfrm'),
            siteFrm = pnl.down('mansitedetailsfrm'),
            productLineDetailsGrid = pnl.down('onlineproductlinedetailsgrid'),
            productLineDetailsStr = productLineDetailsGrid.getStore(),
            ltrFrm = pnl.down('ltrfrm'),
            contactPersonFrm = pnl.down('premisecontactpersonfrm'),
            gmpProductLinkage = pnl.down('gmpproductslinkagedetailsonlinegrid'),
            gmpProductLinkageStore = gmpProductLinkage.getStore(),
            application_id = pnl.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = pnl.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = pnl.down('hiddenfield[name=section_id]').getValue();
            
            mask = new Ext.LoadMask({
                target: pnl,
                msg: 'Please wait...'
            });
             
        mask.show();
      
        if(sub_module_id != 39 && sub_module_id != 40){
            checklistTypesGrid = pnl.down('combo[name=applicable_checklist]'),
            checklistTypesStr = checklistTypesGrid.getStore(),
            checklistTypesStr.removeAll();
    
            checklistTypesStr.load({params: {module_id: module_id, sub_module_id: sub_module_id, section_id: section_id}});
        }
        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpOnlineReceivingStage',
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
                        ltrDetails = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            //pnl.down('combo[name=zone_id]').setValue(results.zone_id);
                            pnl.down('displayfield[name=application_status]').setValue(results.app_status);
                            pnl.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            pnl.down('displayfield[name=process_name]').setValue(results.process_name);

                            pnl.down('combo[name=gmp_type_id]').setValue(results.gmp_type_id);
                            pnl.down('combo[name=device_type_id]').setValue(results.device_type_id);
                            pnl.down('combo[name=assessment_type_id]').setValue(results.assessment_type_id);

                            applicantFrm.loadRecord(model);
                            siteFrm.loadRecord(model);
                            gmpProductLinkageStore.load();

                            productLineDetailsStr.removeAll();
                            productLineDetailsStr.load({params: {site_id: results.manufacturing_site_id}});
                        }
                        if (ltrDetails) {
                            var model2 = Ext.create('Ext.data.Model', ltrDetails);
                            ltrFrm.loadRecord(model2);
                        }
                        if (contactPersonDetails) {//kip here
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactPersonFrm.loadRecord(model3);
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

    //NEW
    prepareNewGmpReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            manufacturingSiteFrm = activeTab.down('mansitedetailsfrm'),
            ltrFrm = activeTab.down('ltrfrm'),
            contactPersonFrm = activeTab.down('premisecontactpersonfrm'),
            productLinesGrid = activeTab.down('productlinedetailsgrid'),
            productline_store = productLinesGrid.getStore(),
            gmpproducts_store = activeTab.down('gmpproductslinkagedetailsgrid').getStore(),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]'),
            assessmentType_fld = activeTab.down('combo[name=assessment_type_id]'),
            gmpType_fld = activeTab.down('combo[name=gmp_type_id]'),
            deviceType_fld = activeTab.down('combo[name=device_type_id]');
        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
       
        if (section_id != 2) {
            productLinesGrid.columns[4].setHidden(true);
            productLinesGrid.columns[5].setHidden(true);
            productLinesGrid.columns[6].setHidden(true);
            productLinesGrid.columns[7].setHidden(true);
        }
        if (application_id) {
            gmpType_fld.setReadOnly(false);
            manufacturingSiteFrm.down('button[action=search_site]').setDisabled(true);
            manufacturingSiteFrm.down('button[name=search_site]').setDisabled(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpReceivingStage',
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
                        results = resp.results,
                        ltrResults = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            assessmentType_fld.setValue(results.assessment_type_id);
                            gmpType_fld.setValue(results.gmp_type_id);
                            deviceType_fld.setValue(results.device_type_id);

                            gmp_type_id_fld.setValue(results.gmp_type_id);
                            gmp_type_txt_fld.setValue(results.gmp_type_txt);
                            applicantFrm.loadRecord(model);
                            manufacturingSiteFrm.loadRecord(model);
                        }
                        if (ltrResults) {
                            var ltr_model = Ext.create('Ext.data.Model', ltrResults);
                            ltrFrm.loadRecord(ltr_model);
                        }
                        if (contactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactPersonFrm.loadRecord(model3);
                        }
                        productline_store.removeAll();
                        productline_store.load();
                        gmpproducts_store.removeAll();
                        gmpproducts_store.load();
                        if (results) {
                            if (results.gmp_type_id == 2 || results.gmp_type_id === 2) {//domestic
                                manufacturingSiteFrm.getForm().getFields().each(function (field) {
                                    // field.setReadOnly(true);
                                });
                                //manufacturingSiteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                                //premiseFrm.down('button[action=search_premise]').setDisabled(false);
                            }
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
            //It's a new application
            var gmp_type_id = gmp_type_id_fld.getValue();
            if (gmp_type_id == 2 || gmp_type_id === 2) {//domestic
                manufacturingSiteFrm.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                //manufacturingSiteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                //premiseFrm.down('textfield[name=permit_no]').setVisible(true);
                manufacturingSiteFrm.down('button[action=search_premise]').setDisabled(false);
                if (section_id == 4) {
                    activeTab.down('combo[name=device_type_id]').setVisible(true);
                    activeTab.down('combo[name=device_type_id]').setReadOnly(false);
                }
            }
            Ext.getBody().unmask();
        }
    },

    prepareNewGmpInvoicing: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]');
        premise_details.setFieldLabel('Manufacturing Site Details');
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpInvoicingStage',
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
                        results = resp.results;
                    if (success == true || success === true) {
                        //var module_id = results.module_id;
                        gmp_type_id_fld.setValue(results.gmp_type_id);
                        gmp_type_txt_fld.setValue(results.gmp_type_txt);
                        activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.manufacturing_site_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        applicant_details.setValue(results.applicant_details);
                       
                        //if (module_id == 2 || module_id === 2) {
                        premise_details.setVisible(true);
                        premise_details.setValue(results.premise_details);
                        //}
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
    }, prepareNewGmpPayments: function () {

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

    

    prepareNewGmpSmfUploads: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
           premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        premise_details.setFieldLabel('Manufacturing Site Details');
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
                url: 'gmpapplications/prepareNewGmpSmfUploadsStage',
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
                        results = resp.results;
                    if (success == true || success === true) {
                        premise_details.setVisible(true);
                        if (results) {
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.manufacturing_site_id);
                            applicant_details.setValue(results.applicant_details);
                            premise_details.setValue(results.premise_details);
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

    prepareNewGmpDeskReviewScheduling: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gmpdeskreviewschedulinggrid'),
            inspectionDetailsFrm = activeTab.down('form'),
            inspection_id = inspectionDetailsFrm.down('hiddenfield[name=id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        if (application_id) {
            if (!inspection_id) {
                applicationsStore.on('load', function (store, records, options) {
                    var record = store.getById(application_id),
                        rowIndex = store.indexOf(record);
                    sm.select(rowIndex, true);
                });
            }
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpManagerInspectionStage',
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

    prepareNewGmpManagerInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gmpmanagerinspectiongrid'),
            inspectionDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicationsStore = applicationsGrid.getStore(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sm = applicationsGrid.getSelectionModel();
        if (application_id) {
            /*  applicationsStore.on('load', function (store, records, options) {
                  var record = store.getById(application_id),
                      rowIndex = store.indexOf(record);
                  sm.select(rowIndex, true);
              });*/
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpManagerInspectionStage',
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
    prepareNewProvisionalGmpInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productLine_store = activeTab.down('productlinedetailsinspectiongrid').store,
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id= activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]');
        premise_details.setFieldLabel('Manufacturing Site Details');
        app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore();
        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpChecklistsStage',
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
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            gmp_type_id_fld.setValue(results.gmp_type_id);
                            gmp_type_txt_fld.setValue(results.gmp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            applicant_details.setValue(results.applicant_details);
                            premise_details.setVisible(true);
                            premise_details.setValue(results.premise_details);
                            productLine_store.removeAll();
                            productLine_store.load({
                                params: {
                                    site_id: results.premise_id
                                }
                            });
                            //observations_store.removeAll();
                            /*observations_store.load({
                                params: {
                                    site_id: results.premise_id
                                }
                            });*/
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
    prepareNewGmpScreening: function () {
        
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = 'mansiteappmoredetailswizard',
            wizardPnl = activeTab.down('mansiteappmoredetailswizard'),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            siteFrm = wizardPnl.down('mansitedetailsfrm'),
            contactPersonFrm = wizardPnl.down('premisecontactpersonfrm'),
            ltrFrm = wizardPnl.down('ltrfrm'),
            otherDetailsGrid = wizardPnl.down('mansiteotherdetailswingrid'),
            productLinesGrid = wizardPnl.down('productlinedetailsgrid'),
            gmpProductDetailsGrid = wizardPnl.down('gmpproductslinkagedetailswingrid'),
            blocksGrid = wizardPnl.down('mansiteblockdetailswingrid'),
            assessmentType_fld = wizardPnl.down('combo[name=assessment_type_id]'),
            gmpType_fld = wizardPnl.down('combo[name=gmp_type_id]'),
            deviceType_fld = wizardPnl.down('combo[name=device_type_id]'),
            siteReadOnly = 0,
            personnelTabPnl = wizardPnl.down('mansitepersonneltabpnl'),
            personnelDetailsGrid = Ext.widget('mansitepersonneldetailswingrid', {
                title: 'Other Personnel'
            });
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(), section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]');
           // premise_details.setFieldLabel('Manufacturing Site Details');


            //edit preview details 
            contactPersonFrm.setMoreDetails(1);
            personnelTabPnl.remove(personnelTabPnl.items.getAt(1));
            personnelTabPnl.add(personnelDetailsGrid);
            
            applicantFrm.down('button[action=link_applicant]').setDisabled(false);
            siteFrm.down('button[action=search_site]').setDisabled(false);
            siteFrm.down('button[name=search_site]').setDisabled(false);
            ltrFrm.down('button[action=link_ltr]').setDisabled(false);
            wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
            wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
            wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
            wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
            wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
           
            wizardPnl.down('combo[name=zone_id]').setReadOnly(false);

            //end 
            if (sub_module_id == 6) {
                activeTab.down('button[name=prev_productline_details]').setVisible(true);
            }
            if (application_code) {
                Ext.Ajax.request({
                    method: 'GET',
                    url: 'gmpapplications/prepareNewGmpChecklistsStage',
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
                            results = resp.results,
                            applicantDetails = resp.applicant_details,
                            siteDetails = resp.site_details,
                            ltrDetails = resp.ltr_details,
                            contactPersonDetails = resp.contact_details;
                        if (success == true || success === true) {
                            if (results) {
                                gmp_type_id_fld.setValue(results.gmp_type_id);
                                gmp_type_txt_fld.setValue(results.gmp_type_txt);
                                activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                                activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.premise_id);
                                activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                                //applicant_details.setValue(results.applicant_details);
                              //  premise_details.setVisible(true);
                             //   premise_details.setValue(results.premise_details);
                                wizardPnl.down('hiddenfield[name=gmp_type_id]').setValue(results.gmp_type_id);
                            }
                            if (applicantDetails) {
                                var model1 = Ext.create('Ext.data.Model', applicantDetails);
                                applicantFrm.loadRecord(model1);
                            }
                            if (siteDetails) {
                                assessmentType_fld.setValue(siteDetails.assessment_type_id);
                                gmpType_fld.setValue(siteDetails.gmp_type_id);
                                deviceType_fld.setValue(siteDetails.device_type_id);
                                var model2 = Ext.create('Ext.data.Model', siteDetails);
                                siteFrm.loadRecord(model2);
                            }
                            if (ltrDetails) {
                                var model3 = Ext.create('Ext.data.Model', ltrDetails);
                                ltrFrm.loadRecord(model3);
                            }
                            if (contactPersonDetails) {
                                var model4 = Ext.create('Ext.data.Model', contactPersonDetails);
                                contactPersonFrm.loadRecord(model4);
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
    prepareNewGmpInspection: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            productlinedetailsgrid = activeTab.down('productlinedetailsinspectiongrid'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            inspectionscaparequestsgrid = activeTab.down('inspectionscaparequestsgrid'),
            inspectiondetailsupdatefrm = activeTab.down('inspectiondetailsupdatefrm'),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]');
      
        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        inspectionscaparequestsgrid.down('hiddenfield[name=section_id]').setValue(section_id);
        inspectionscaparequestsgrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        inspectionscaparequestsgrid.down('hiddenfield[name=module_id]').setValue(module_id);
        inspectionscaparequestsgrid.down('hiddenfield[name=application_code]').setValue(application_code);

        inspectionscaparequestsgrid.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);

        inspectiondetailsupdatefrm.down('hiddenfield[name=application_code]').setValue(application_code);

        if (section_id != 2) {
            productlinedetailsgrid.columns[4].setHidden(true);
            productlinedetailsgrid.columns[5].setHidden(true);
            productlinedetailsgrid.columns[6].setHidden(true);
            productlinedetailsgrid.columns[7].setHidden(true);
        }


        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpChecklistsStage',
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
                        inspection_details = resp.inspection_details,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            gmp_type_id_fld.setValue(results.gmp_type_id);
                            gmp_type_txt_fld.setValue(results.gmp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            applicant_details.setValue(results.applicant_details);
                          
                            if(activeTab.down('inspectiondetailsupdatefrm')){
                                if(inspection_details){
                                    var inspection_details = Ext.create('Ext.data.Model', inspection_details);
                       
                                    var inspectiondetailsupdatefrm = activeTab.down('inspectiondetailsupdatefrm');
                                    inspectiondetailsupdatefrm.loadRecord(inspection_details);
                                }
                               
                            }
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

    prepareNewGmpTCMeetingScheduling: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gmpmeetingschedulinggrid');
        this.prepareGmpTCMeetingSchedulingGeneric(activeTab, applicationsGrid, 0);
    },

    prepareGmpTCMeetingSchedulingGeneric: function (activeTab, applicationsGrid, isReadOnly) {
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
        //this.redoTcMeetingParticipantsGrid(participantsGrid);
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
                url: 'prepareApplicationTCMeetingSchedulingStage',
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
    prepareNewGmpTCRecommendation: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicationsGrid = activeTab.down('gmptcmeetingrecommendationgrid');
        this.prepareGmpTCMeetingSchedulingGeneric(activeTab, applicationsGrid, 0);
    },
    prepareNewGmpTCRecommendation1: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productLine_store = activeTab.down('productlinedetailstcrecommgrid').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            site_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]');
        site_details.setFieldLabel('Manufacturing Site Details');
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpChecklistsStage',
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
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            gmp_type_id_fld.setValue(results.gmp_type_id);
                            gmp_type_txt_fld.setValue(results.gmp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            applicant_details.setValue(results.applicant_details);
                            site_details.setVisible(true);
                            site_details.setValue(results.premise_details);
                            productLine_store.removeAll();
                            productLine_store.load({
                                params: {
                                    site_id: results.premise_id
                                }
                            });
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

    prepareNewGmpMainApprovals: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            mainGrid = activeTab.down('grid'),
            mainStore = mainGrid.getStore(),
            sm = mainGrid.getSelectionModel(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (application_id) {
            mainStore.on('load', function (store, records, options) {
                var record = store.getById(application_id),
                    rowIndex = store.indexOf(record);
                sm.select(rowIndex, true);
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareNewGmpSingleApproval: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productLine_store = activeTab.down('productlinedetailsdgrecommgrid').store,
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            otherDetailsFrm = activeTab.down('form'),
            applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
            site_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]');
        site_details.setFieldLabel('Manufacturing Site Details');
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        if (sub_module_id == 6) {
            activeTab.down('button[name=prev_productline_details]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpChecklistsStage',
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
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            gmp_type_id_fld.setValue(results.gmp_type_id);
                            gmp_type_txt_fld.setValue(results.gmp_type_txt);
                            activeTab.down('hiddenfield[name=premise_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.premise_id);
                            activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                            applicant_details.setValue(results.applicant_details);
                            site_details.setVisible(true);
                            site_details.setValue(results.premise_details);
                            productLine_store.removeAll();
                            productLine_store.load({
                                params: {
                                    site_id: results.premise_id
                                }
                            });
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

    //RENEW
    prepareRenewGmpReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            siteFrm = activeTab.down('mansitedetailsfrm'),
            ltrFrm = activeTab.down('ltrfrm'),
            contactFrm = activeTab.down('premisecontactpersonfrm'),
            gmpproducts_store = activeTab.down('gmpproductslinkagedetailsgrid').getStore(),
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]'),
            assessmentType_fld = activeTab.down('combo[name=assessment_type_id]'),
            gmpType_fld = activeTab.down('combo[name=gmp_type_id]'),
            deviceType_fld = activeTab.down('combo[name=device_type_id]'),
            productlinedetailsgrid = activeTab.down('productlinedetailsgrid'),
            productline_store = productlinedetailsgrid.getStore(),
            gmpProductsGrid = activeTab.down('gmpproductslinkagedetailsgrid');
            app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore();
        app_check_types_store.removeAll();
        app_check_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        siteFrm.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
        });
        siteFrm.down('textfield[name=gmp_cert_no]').setVisible(true);
        activeTab.down('mansiteotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('mansitepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('mansiteblockdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        contactFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        ltrFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        productlinedetailsgrid.down('button[name=add_line]').setVisible(false);
        productlinedetailsgrid.columns[productlinedetailsgrid.columns.length - 1].setHidden(true);
        gmpProductsGrid.down('button[action=search_product]').setVisible(false);
        gmpProductsGrid.columns[gmpProductsGrid.columns.length - 1].setHidden(true);

        me.fireEvent('gmpOtherPartsAuth', process_id, activeTab);
        //me.fireEvent('formAuth', process_id, 1, premiseFrm);
        siteFrm.down('button[action=search_site]').setDisabled(false);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        
        if (section_id != 2) {
            productlinedetailsgrid.columns[4].setHidden(true);
            productlinedetailsgrid.columns[5].setHidden(true);
            productlinedetailsgrid.columns[6].setHidden(true);
            productlinedetailsgrid.columns[7].setHidden(true);
        }
        if (application_id) {
            siteFrm.down('button[name=search_site]').setDisabled(true);
            siteFrm.down('button[action=search_site]').setDisabled(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpReceivingStage',
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
                        results = resp.results,
                        ltrResults = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            assessmentType_fld.setValue(results.assessment_type_id);
                            gmpType_fld.setValue(results.gmp_type_id);
                            deviceType_fld.setValue(results.device_type_id);
                            gmp_type_id_fld.setValue(results.gmp_type_id);
                            gmp_type_txt_fld.setValue(results.gmp_type_txt);
                            applicantFrm.loadRecord(model);
                            siteFrm.loadRecord(model);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.manufacturing_site_id);
                        }
                        if (ltrResults) {
                            var ltr_model = Ext.create('Ext.data.Model', ltrResults);
                            ltrFrm.loadRecord(ltr_model);
                        }
                        if (contactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactFrm.loadRecord(model3);
                        }
                        productline_store.removeAll();
                        productline_store.load();
                        gmpproducts_store.removeAll();
                        gmpproducts_store.load();
                        if (results) {
                            if (results.gmp_type_id == 2 || results.gmp_type_id === 2) {//domestic
                                siteFrm.getForm().getFields().each(function (field) {
                                    field.setReadOnly(true);
                                });
                            } else {
                                me.fireEvent('formAuth', process_id, 1, siteFrm);
                            }
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
            //It's a new application
            var gmp_type_id = gmp_type_id_fld.getValue();
            if (gmp_type_id == 2 || gmp_type_id === 2) {//domestic
                siteFrm.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                siteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                //premiseFrm.down('textfield[name=permit_no]').setVisible(true);
                siteFrm.down('button[action=search_premise]').setDisabled(false);
            }
            Ext.getBody().unmask();
        }
    },

    //CANCELLATION
    prepareCancellationGmpReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            siteFrm = activeTab.down('mansitedetailsfrm'),
            ltrFrm = activeTab.down('ltrfrm'),
            contactFrm = activeTab.down('premisecontactpersonfrm'),
            gmpproducts_store = activeTab.down('gmpproductslinkagedetailsgrid').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            gmp_type_id_fld = activeTab.down('hiddenfield[name=gmp_type_id]'),
            gmp_type_txt_fld = activeTab.down('displayfield[name=gmp_type_txt]'),
            assessmentType_fld = activeTab.down('combo[name=assessment_type_id]'),
            gmpType_fld = activeTab.down('combo[name=gmp_type_id]'),
            deviceType_fld = activeTab.down('combo[name=device_type_id]'),
            productlinedetailsgrid = activeTab.down('productlinedetailsgrid'),
            productline_store = productlinedetailsgrid.getStore(),
            gmpProductsGrid = activeTab.down('gmpproductslinkagedetailsgrid');
        siteFrm.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
        });
        siteFrm.down('textfield[name=gmp_cert_no]').setVisible(true);
        activeTab.down('mansiteotherdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('mansitepersonneldetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        activeTab.down('mansiteblockdetailsgrid').down('hiddenfield[name=isReadOnly]').setValue(1);
        contactFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        ltrFrm.down('hiddenfield[name=isReadOnly]').setValue(1);
        productlinedetailsgrid.down('button[name=add_line]').setVisible(false);
        productlinedetailsgrid.columns[productlinedetailsgrid.columns.length - 1].setHidden(true);
        gmpProductsGrid.down('button[action=search_product]').setVisible(false);
        gmpProductsGrid.columns[gmpProductsGrid.columns.length - 1].setHidden(true);

        me.fireEvent('gmpOtherPartsAuth', process_id, activeTab);
        //me.fireEvent('formAuth', process_id, 1, premiseFrm);
        siteFrm.down('button[action=search_site]').setDisabled(false);
        applicantFrm.down('button[action=link_applicant]').setDisabled(true);
        
        if (section_id != 2) {
            productlinedetailsgrid.columns[4].setHidden(true);
            productlinedetailsgrid.columns[5].setHidden(true);
            productlinedetailsgrid.columns[6].setHidden(true);
            productlinedetailsgrid.columns[7].setHidden(true);
        }
        if (application_id) {
            siteFrm.down('button[name=search_site]').setDisabled(true);
            siteFrm.down('button[action=search_site]').setDisabled(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'gmpapplications/prepareNewGmpReceivingStage',
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
                        results = resp.results,
                        ltrResults = resp.ltrDetails,
                        contactPersonDetails = resp.contactPersonDetails;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            assessmentType_fld.setValue(results.assessment_type_id);
                            gmpType_fld.setValue(results.gmp_type_id);
                            deviceType_fld.setValue(results.device_type_id);
                            gmp_type_id_fld.setValue(results.gmp_type_id);
                            gmp_type_txt_fld.setValue(results.gmp_type_txt);
                            applicantFrm.loadRecord(model);
                            siteFrm.loadRecord(model);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(results.manufacturing_site_id);
                        }
                        if (ltrResults) {
                            var ltr_model = Ext.create('Ext.data.Model', ltrResults);
                            ltrFrm.loadRecord(ltr_model);
                        }
                        if (contactPersonDetails) {
                            var model3 = Ext.create('Ext.data.Model', contactPersonDetails);
                            contactFrm.loadRecord(model3);
                        }
                        productline_store.removeAll();
                        productline_store.load();
                        gmpproducts_store.removeAll();
                        gmpproducts_store.load();
                        if (results) {
                            if (results.gmp_type_id == 2 || results.gmp_type_id === 2) {//domestic
                                siteFrm.getForm().getFields().each(function (field) {
                                    field.setReadOnly(true);
                                });
                            } else {
                                me.fireEvent('formAuth', process_id, 1, siteFrm);
                            }
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
            //It's a new application
            var gmp_type_id = gmp_type_id_fld.getValue();
            if (gmp_type_id == 2 || gmp_type_id === 2) {//domestic
                siteFrm.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                siteFrm.down('textfield[name=premise_reg_no]').setVisible(true);
                //premiseFrm.down('textfield[name=permit_no]').setVisible(true);
                siteFrm.down('button[action=search_premise]').setDisabled(false);
            }
            Ext.getBody().unmask();
        }
    },

    //COMPARE
    prepareGmpComparePreview: function (pnl) {
        var me = this,
            portalPnl = pnl.down('gmpportalcomparepreviewpnl'),
            misPnl = pnl.down('gmpmiscomparepreviewpnl'),
            portalWizard = portalPnl.down('panel[name=wizardPanel]'),
            misWizard = misPnl.down('panel[name=wizardPanel]'),
            portalApplicantFrm = portalWizard.down('applicantdetailsfrm'),
            misApplicantFrm = misWizard.down('applicantdetailsfrm'),
            portalSiteFrm = portalWizard.down('mansitedetailsfrm'),
            misSiteFrm = misWizard.down('mansitedetailsfrm'),
            portalContactPersonFrm = portalWizard.down('premisecontactpersonfrm'),
            misContactPersonFrm = misWizard.down('premisecontactpersonfrm'),
            portalLtrFrm = portalWizard.down('ltrfrm'),
            misLtrFrm = misWizard.down('ltrfrm'),

            portalProductLineGrid = portalWizard.down('onlineproductlinedetailsgrid'),
            misProductLineGrid = misWizard.down('productlinedetailswingrid'),
            portalProductsGrid = portalWizard.down('gmpproductslinkagedetailsonlinegrid'),
            misProductsGrid = misWizard.down('gmpproductslinkagedetailswingrid'),

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
                url: 'gmpapplications/getGmpCompareDetails',//kip here
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
                        portalContactPersonDetails = resp.portalContactPersonDetails,
                        portalLtrDetails = resp.portalLtrDetails,
                        misResults = resp.misResults,
                        misContactPersonDetails = resp.misContactPersonDetails,
                        misLtrDetails = resp.misLtrDetails;
                    if (success == true || success === true) {
                        if (portalResults) {
                            var model = Ext.create('Ext.data.Model', portalResults);
                            portalApplicantFrm.loadRecord(model);
                            portalSiteFrm.loadRecord(model);
                            portalPnl.down('combo[name=gmp_type_id]').setValue(portalResults.gmp_type_id);
                            portalPnl.down('combo[name=device_type_id]').setValue(portalResults.device_type_id);
                            portalPnl.down('combo[name=assessment_type_id]').setValue(portalResults.assessment_type_id);
                        }
                        if (portalContactPersonDetails) {
                            var model1 = Ext.create('Ext.data.Model', portalContactPersonDetails);
                            portalContactPersonFrm.loadRecord(model1);
                        }
                        if (portalLtrDetails) {
                            var model2 = Ext.create('Ext.data.Model', portalLtrDetails);
                            portalLtrFrm.loadRecord(model2);
                        }
                        if (misResults) {
                            var model3 = Ext.create('Ext.data.Model', misResults);
                            misApplicantFrm.loadRecord(model3);
                            misSiteFrm.loadRecord(model3);
                            misPnl.down('combo[name=gmp_type_id]').setValue(misResults.gmp_type_id);
                            misPnl.down('combo[name=device_type_id]').setValue(misResults.device_type_id);
                            misPnl.down('combo[name=assessment_type_id]').setValue(misResults.assessment_type_id);
                        }
                        if (misContactPersonDetails) {
                            var model4 = Ext.create('Ext.data.Model', misContactPersonDetails);
                            misContactPersonFrm.loadRecord(model4);
                        }
                        if (misLtrDetails) {
                            var model5 = Ext.create('Ext.data.Model', misLtrDetails);
                            misLtrFrm.loadRecord(model5);
                        }
                        portalProductLineGrid.getStore().load();
                        misProductLineGrid.getStore().load();
                        portalProductsGrid.getStore().load();
                        misProductsGrid.getStore().load();
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

    beforeManSiteTabChange: function (tabPnl, newTab) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
        if (sub_module_id == 5) {//NEW
            if (tabPnl.items.indexOf(newTab) > 1) {
                if (!application_id) {
                    toastr.warning('Save Application details first!!', 'Warning Response');
                    return false;
                }
            }
        } else {

        }
    },

    saveGmpNewReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_fld = activeTab.down('combo[name=gmp_type_id]'),
            device_type_fld = activeTab.down('combo[name=device_type_id]'),
            assessment_type_fld = activeTab.down('combo[name=assessment_type_id]'),
            gmp_type_id = gmp_type_fld.getValue(),
            device_type_id = device_type_fld.getValue(),
            assessment_type_id = assessment_type_fld.getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            ltrForm = activeTab.down('ltrfrm'),
            contactPersonForm = activeTab.down('premisecontactpersonfrm'),
            applicant_contact_person = contactPersonForm.down('combo[name=applicant_contact_person]').getValue(),
            contact_person_id = contactPersonForm.down('hiddenfield[name=id]').getValue(),
            contact_person_startdate = contactPersonForm.down('datefield[name=start_date]').getValue(),
            contact_person_enddate = contactPersonForm.down('datefield[name=end_date]').getValue(),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            ltr_id = ltrForm.down('hiddenfield[name=ltr_id]').getValue(),
            applicant_as_ltr = ltrForm.down('combo[name=applicant_as_ltr]').getValue(),
            manSiteDetailsForm = activeTab.down('mansitedetailsfrm'),
            manSiteDetailsFrm = manSiteDetailsForm.getForm(),
            action_url = 'gmpapplications/saveNewGmpReceivingBaseDetails';
        if (!assessment_type_id) {
            toastr.warning('Please select asessessment type!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (manSiteDetailsFrm.isValid()) {
            if (!applicant_as_ltr) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            } else if (applicant_as_ltr == 2 && !ltr_id) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            }
            manSiteDetailsFrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    ltr_id: ltr_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    gmp_type_id: gmp_type_id,
                    assessment_type_id: assessment_type_id,
                    device_type_id: device_type_id,
                    applicant_as_ltr: applicant_as_ltr,
                    applicant_contact_person: applicant_contact_person,
                    contact_person_id: contact_person_id,
                    contact_person_startdate: contact_person_startdate,
                    contact_person_enddate: contact_person_enddate
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        site_id = resp.manufacturing_site_id,
                        reg_site_id = resp.registered_manufacturing_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
                            activeTab.down('hiddenfield[name=registered_manufacturing_site_id]').setValue(reg_site_id);
                            manSiteDetailsForm.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
                            manSiteDetailsForm.down('button[action=search_site]').setDisabled(true);
                            manSiteDetailsForm.down('button[name=search_site]').setDisabled(true);
                            gmp_type_fld.setReadOnly(true);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },

    saveGmpRenewalReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            gmp_type_id = activeTab.down('combo[name=gmp_type_id]').getValue(),
            device_type_fld = activeTab.down('combo[name=device_type_id]'),
            assessment_type_fld = activeTab.down('combo[name=assessment_type_id]'),
            device_type_id = device_type_fld.getValue(),
            assessment_type_id = assessment_type_fld.getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            applicantDetailsForm = activeTab.down('applicantdetailsfrm'),
            ltrForm = activeTab.down('ltrfrm'),
            contactPersonForm = activeTab.down('premisecontactpersonfrm'),
            applicant_contact_person = contactPersonForm.down('combo[name=applicant_contact_person]').getValue(),
            contact_person_id = contactPersonForm.down('hiddenfield[name=id]').getValue(),
            contact_person_startdate = contactPersonForm.down('datefield[name=start_date]').getValue(),
            contact_person_enddate = contactPersonForm.down('datefield[name=end_date]').getValue(),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            ltr_id = ltrForm.down('hiddenfield[name=ltr_id]').getValue(),
            applicant_as_ltr = ltrForm.down('combo[name=applicant_as_ltr]').getValue(),
            productLineDetailsStore = activeTab.down('productlinedetailsgrid').getStore(),
            manSiteDetailsForm = activeTab.down('mansitedetailsfrm'),
            manSiteDetailsFrm = manSiteDetailsForm.getForm(),
            action_url = 'gmpapplications/saveRenewalGmpReceivingBaseDetails';
        if (!gmp_type_id) {
            toastr.warning('Please select GMP type!!', 'Warning Response');
            return false;
        }
        if (!assessment_type_id) {
            toastr.warning('Please select assessment type!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (manSiteDetailsFrm.isValid()) {
            if (!applicant_as_ltr) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            } else if (applicant_as_ltr == 2 && !ltr_id) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            }
            manSiteDetailsFrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    ltr_id: ltr_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    gmp_type_id: gmp_type_id,
                    assessment_type_id: assessment_type_id,
                    device_type_id: device_type_id,
                    applicant_as_ltr: applicant_as_ltr,
                    applicant_contact_person: applicant_contact_person,
                    contact_person_id: contact_person_id,
                    contact_person_startdate: contact_person_startdate,
                    contact_person_enddate: contact_person_enddate
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        tracking_no = resp.tracking_no,
                        application_code = resp.application_code,
                        manufacturing_site_id = resp.manufacturing_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(manufacturing_site_id);
                            manSiteDetailsForm.down('hiddenfield[name=manufacturing_site_id]').setValue(manufacturing_site_id);
                            manSiteDetailsForm.down('button[name=search_site]').setDisabled(true);
                            manSiteDetailsForm.down('button[action=search_site]').setDisabled(true);
                            activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
                            productLineDetailsStore.load();
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },

    updateGmpApplicationDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            wizardPnl = btn.up('panel'),
            process_id = wizardPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = wizardPnl.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = wizardPnl.down('hiddenfield[name=sub_module_id]').getValue(),

            gmp_type_id = wizardPnl.down('combo[name=gmp_type_id]').getValue(),
            device_type_fld = wizardPnl.down('combo[name=device_type_id]'),
            assessment_type_fld = wizardPnl.down('combo[name=assessment_type_id]'),
            device_type_id = device_type_fld.getValue(),
            assessment_type_id = assessment_type_fld.getValue(),

            section_id = wizardPnl.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = wizardPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = wizardPnl.down('hiddenfield[name=application_id]').getValue(),

            contactPersonForm = wizardPnl.down('premisecontactpersonfrm'),
            applicant_contact_person = contactPersonForm.down('combo[name=applicant_contact_person]').getValue(),
            contact_person_id = contactPersonForm.down('hiddenfield[name=id]').getValue(),
            contact_person_startdate = contactPersonForm.down('datefield[name=start_date]').getValue(),
            contact_person_enddate = contactPersonForm.down('datefield[name=end_date]').getValue(),

            applicantDetailsForm = wizardPnl.down('applicantdetailsfrm'),
            ltrForm = wizardPnl.down('ltrfrm'),
            applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
            ltr_id = ltrForm.down('hiddenfield[name=ltr_id]').getValue(),
            applicant_as_ltr = ltrForm.down('combo[name=applicant_as_ltr]').getValue(),
            siteDetailsForm = wizardPnl.down('mansitedetailsfrm'),
            siteDetailsFrm = siteDetailsForm.getForm(),
            action_url = 'gmpapplications/saveRenewalGmpReceivingBaseDetails';
        if (sub_module_id == 5 || sub_module_id === 5) {
            action_url = 'gmpapplications/saveNewGmpReceivingBaseDetails';
        }
        if (!gmp_type_id) {
            toastr.warning('Please select GMP type!!', 'Warning Response');
            return false;
        }
        if (!assessment_type_id) {
            toastr.warning('Please select assessment type!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please select applicant!!', 'Warning Response');
            return false;
        }
        if (siteDetailsFrm.isValid()) {
            if (!applicant_as_ltr) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            } else if (applicant_as_ltr == 2 && !ltr_id) {
                toastr.warning('Please select Local Technical Representative!!', 'Warning Response');
                return false;
            }
            siteDetailsFrm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    applicant_id: applicant_id,
                    ltr_id: ltr_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    gmp_type_id: gmp_type_id,
                    assessment_type_id: assessment_type_id,
                    device_type_id: device_type_id,
                    applicant_as_ltr: applicant_as_ltr,
                    applicant_contact_person: applicant_contact_person,
                    contact_person_id: contact_person_id,
                    contact_person_startdate: contact_person_startdate,
                    contact_person_enddate: contact_person_enddate
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
            return false;
        }
    },

    showLTRSelectionList: function (btn) {
        var childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype);
            childObject.applicantType = 'local';
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    showSearch_inspectionteam: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            childObject = Ext.widget(childXtype);
           // childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },


    onsearchinspectionschedulesgridDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            gmpinspectionscheduleteamfrm = activeTab.down('gmpinspectionscheduleteamfrm'),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        gmpinspectionscheduleteamfrm.loadRecord(record);
            
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },
    onLTRSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantForm = this.getLtrfrm(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        applicantForm.loadRecord(record);
            
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    showAddSitePersonnelDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            site_id = activeTab.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue(),
            trader_id = activeTab.down('applicantdetailsfrm').down('hiddenfield[name=applicant_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            positionsStore = Ext.getStore('personnelpositionsstr');
        childObject.down('button[name=save_btn]').storeID = btn.storeID;
        childObject.down('button[name=save_btn]').action_url = btn.action_url;
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=trader_id]').setValue(trader_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
        positionsStore.removeAll();
        positionsStore.load();
    },

    showAddSitePersonnelDetailsWin: function (btn) {
        var me = this,
            win = btn.up('window'),
            site_id = win.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue(),
            trader_id = win.down('applicantdetailsfrm').down('hiddenfield[name=applicant_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            positionsStore = Ext.getStore('personnelpositionsstr');
        childObject.down('button[name=save_btn]').storeID = btn.storeID;
        childObject.down('button[name=save_btn]').action_url = btn.action_url;
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=trader_id]').setValue(trader_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
        positionsStore.removeAll();
        positionsStore.load();
    },

    showAddSiteOtherDetails: function (btn) {
        var me = this,
            is_manufacturer = btn.isManufacturer,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            business_type_id = activeTab.down('combo[name=business_type_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            busTypesStr = childObject.down('combo[name=business_type_id]').getStore(),
            filterObj = {section_id: section_id},
            filterStr = JSON.stringify(filterObj);
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('combo[name=business_type_id]').setValue(business_type_id);
        busTypesStr.removeAll();
        busTypesStr.load({params: {filters: filterStr}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddSiteOtherDetailsWin: function (btn) {
        var me = this,
            win = btn.up('window'),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            site_id = win.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            business_type_id = win.down('combo[name=business_type_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            busTypesStr = childObject.down('combo[name=business_type_id]').getStore(),
            filterObj = {section_id: section_id},
            filterStr = JSON.stringify(filterObj);
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('combo[name=business_type_id]').setValue(business_type_id);
        busTypesStr.removeAll();
        busTypesStr.load({params: {filters: filterStr}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddGmpProductLineDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),

            
            site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            productLineStr = childObject.down('combo[name=product_line_id]').getStore(),
            productLineCategoryStr = childObject.down('combo[name=category_id]').getStore();
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        productLineStr.removeAll();
        productLineStr.load({params: {section_id: section_id}});
        productLineCategoryStr.removeAll();
        productLineCategoryStr.load({params: {section_id: section_id}});
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddGmpNonComplianceDetails1: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showAddGmpNonComplianceDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        //childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=module_id]').setValue(module_id);
        childObject.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    },

    showPrevProductLineDetails: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue();
        this.showAddGmpWinsWithSiteID(btn, site_id);
    },

    showAddGmpWinsWithSiteID: function (btn, site_id) {
        var me = this,
            childXtype = btn.childXtype,
            title = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
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
            valid = this.validateNewGmpReceivingSubmission(btn),
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

    validateNewGmpReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            manufacturingSiteFrm = activeTab.down('mansitedetailsfrm'),
            screeningGrid = activeTab.down('gmpscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!manufacturingSiteFrm.isValid()) {
            toastr.warning('Please Enter All the required Premise Details!!', 'Warning Response');
            return false;
        }
        this.saveGmpNewReceivingBaseDetails(btn);
        
        return true;
    }
    ,

    showSmfUploadsApplicationSubmissionWin: function (btn) {
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
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    }
    ,

    showInspectionSchedulingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            gmp_inspection_type = btn.gmp_inspection_type,
            gridXtype = btn.gridXtype,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'gmpinspection_type_id',
                value: gmp_inspection_type
            }],
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID, extraParams, gridXtype);
        } else {
            Ext.getBody().unmask();
        }
    },

    showGmpDeskReviewSchedulingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateDeskReviewSchedulingApplicationSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 1),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id
            }];
        if (!leadInspectorDetails) {
            Ext.getBody().unmask();
            toastr.warning('No lead inspector found!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, extraParams, 'gmpdeskreviewschedulinggrid', 'selected');
        } else {
            Ext.getBody().unmask();
        }
    },

    validateDeskReviewSchedulingApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveDeskReviewScheduleDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            valid = false;
        }
        return valid;
    },

    showManagerInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            inspectorsGrid = activeTab.down('grid[name=inspectorsGrid]'),
            inspectorsStore = inspectorsGrid.getStore(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue(),
            leadInspectorDetails = inspectorsStore.findRecord('role_id', 1),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id
            }];
        if (!leadInspectorDetails) {
            Ext.getBody().unmask();
            toastr.warning('No lead inspector found!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsinspectionsfrm', winWidth, storeID, extraParams, 'gmpmanagerinspectiongrid', 'all');
        } else {
            Ext.getBody().unmask();
        }
    },
    
    showInspectionApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id, 2),
            hasRespondedUnclosedQueries = checkApplicationRespondedUnclosedQueries(application_code, module_id),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
            var inspection_frm = activeTab.down('inspectiondetailsupdatefrm');
                    insp_frm = inspection_frm.getForm();
                if(inspection_frm.isValid()){
                    gmpinspection_recommendation_id = inspection_frm.down('combo[name=gmpinspection_recommendation_id]').getValue();


                }
                else{
                    Ext.getBody().unmask();
                    toastr.warning('Please fill and save in the GMP Inspection Details before submission!!', 'Validation Check');
                    return false;

                }
            if(gmpinspection_recommendation_id == 1 ){
                    var workflowaction_type_id = 31;

            }
            else if (gmpinspection_recommendation_id == 2 ){
                var workflowaction_type_id = 29;

            }else{
                var workflowaction_type_id = 27;
            }
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            },{
                field_type: 'hiddenfield',
                field_name: 'workflowaction_type_id',
                value: workflowaction_type_id
            }];

        if (hasRespondedUnclosedQueries > 0) {
            Ext.getBody().unmask();
            toastr.warning('Please close responded queries to proceed!!', 'Warning Response');
            return false;
        }
        if(hasQueries ==2){
            toastr.warning('Enter the query Items for the open query to proceed with the query submission!!', 'Warning Response');
            Ext.getBody().unmask();
            return false;
           
        }
        if (valid == true || valid === true) {
            showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsstrictrecommfrm', winWidth, storeID, 1, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },
    showScreeningApplicationSubmissionWin : function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            hasQueries = checkApplicationRaisedQueries(application_code, module_id, 2),

            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'has_queries',
                value: hasQueries
            }];
            
        if (valid == true || valid === true) {
          
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID,extraParams,'','',workflow_stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    showTCMeetingSchedulingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateTCMeetingSchedulingApplicationSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },
    showTCMeetingReviewgApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
    
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID);
       
    },
    validateTCMeetingSchedulingApplicationSubmission: function (btn) {
        var valid = true,
            saveInfo = this.saveTCMeetingDetails(btn);
        if (saveInfo == false || saveInfo === false) {
            valid = false;
        }
        return valid;
    },

    showTCMeetingRecommendationApplicationSubmissionWin: function (btn) {
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
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    showSingleApprovalApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true,
            storeID = 'gmpapprovalsstr',//getApplicationStore(module_id, section_id),//static
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
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
            grid = activeTab.down('grid'),
            sel = grid.getSelectionModel().getSelection(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id),
            gmp_inspection_type = sel[0].get('inspection_type_id'),
            inspection_id = sel[0].get('inspection_id'),
            extraParams = [{
                field_type: 'hiddenfield',
                field_name: 'gmpinspection_type_id',
                value: gmp_inspection_type
            }, {
                field_type: 'hiddenfield',
                field_name: 'inspection_id',
                value: inspection_id
            }];
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagerqueryfrm', winWidth, storeID, extraParams);
        } else {
            Ext.getBody().unmask();
        }
    },

    showCommunicationsApplicationSubmissionWin: function (btn) {
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
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionmanagersgenericfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    //Renew
    showRenewReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateRenewGmpReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateRenewGmpReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicantFrm = activeTab.down('applicantdetailsfrm'),
            applicant_id = applicantFrm.down('hiddenfield[name=applicant_id]').getValue(),
            siteFrm = activeTab.down('mansitedetailsfrm'),
            screeningGrid = activeTab.down('gmpscreeninggrid'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
        if (!application_id) {
            toastr.warning('Please Save Application Details!!', 'Warning Response');
            return false;
        }
        if (!applicant_id) {
            toastr.warning('Please Select Applicant!!', 'Warning Response');
            return false;
        }
        if (!siteFrm.isValid()) {
            toastr.warning('Please Enter All the required manufacturing site details!!', 'Warning Response');
            return false;
        }
        this.saveGmpRenewalReceivingBaseDetails(btn);
        if (sub_module_id == 6 || sub_module_id === 6) {//renewal
            if (screeningGrid.getStore().getModifiedRecords().length > 0) {
                Ext.getBody().unmask();
                toastr.warning('There are unsaved screening data!!', 'Warning Response');
                return false;
            }
        }
        return true;
    },

    showGmpApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = activeTab.down('hiddenfield[name=gmp_type_id]').getValue();
        this.showGmpApplicationMoreDetailsGeneric(application_id, application_code, site_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, gmp_type_id);
    },

    showGmpApplicationMoreDetailsGeneric: function (application_id, application_code, site_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, gmp_type_id) {
        Ext.getBody().mask('Please wait...');
        var childXtype = 'mansiteappmoredetailswizard';
        if (sub_module_id == 40 || sub_module_id === 40) {
            childXtype = 'mansiteappmoredetailsaltwizard';
        }
        var me = this,
             wizardPnl = Ext.create('Ext.tab.Panel', {layout: 'fit',items:[{xtype: childXtype, title: 'GMP Application Details '}]}),
           // wizardPnl = Ext.widget(childXtype),
            applicantFrm = wizardPnl.down('applicantdetailsfrm'),
            siteFrm = wizardPnl.down('mansitedetailsfrm'),
            contactPersonFrm = wizardPnl.down('premisecontactpersonfrm'),
            ltrFrm = wizardPnl.down('ltrfrm'),
            otherDetailsGrid = wizardPnl.down('mansiteotherdetailswingrid'),
            productLinesGrid = wizardPnl.down('productlinedetailsgrid'),
            gmpProductDetailsGrid = wizardPnl.down('gmpproductslinkagedetailswingrid'),
            blocksGrid = wizardPnl.down('mansiteblockdetailswingrid'),
            assessmentType_fld = wizardPnl.down('combo[name=assessment_type_id]'),
            gmpType_fld = wizardPnl.down('combo[name=gmp_type_id]'),
            deviceType_fld = wizardPnl.down('combo[name=device_type_id]'),
            siteReadOnly = 0,
            personnelTabPnl = wizardPnl.down('mansitepersonneltabpnl'),
            personnelDetailsGrid = Ext.widget('mansitepersonneldetailswingrid', {
                title: 'Other Personnel'
            });
        if (gmp_type_id == 2 || gmp_type_id === 2) {
            siteReadOnly = 0;
        }
        contactPersonFrm.setMoreDetails(1);
        personnelTabPnl.remove(personnelTabPnl.items.getAt(1));
        personnelTabPnl.add(personnelDetailsGrid);
        wizardPnl.setHeight(550);
        applicantFrm.down('button[action=link_applicant]').setDisabled(false);
        siteFrm.down('button[action=search_site]').setDisabled(false);
        siteFrm.down('button[name=search_site]').setDisabled(false);
        ltrFrm.down('button[action=link_ltr]').setDisabled(false);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        wizardPnl.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        wizardPnl.down('combo[name=zone_id]').setReadOnly(false);
        if ((siteReadOnly) && (siteReadOnly == 1 || siteReadOnly === 1)) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        }
       /* personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        blocksGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        productLineDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        gmpProductDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        */
        siteFrm.down('hiddenfield[name=isReadOnly]').setValue(siteReadOnly);
        if (section_id != 2) {
            if(wizardPnl.down('productlinedetailsgrid')){
                productLinesGrid.columns[4].setHidden(true);
                productLinesGrid.columns[5].setHidden(true);
                productLinesGrid.columns[6].setHidden(true);
                productLinesGrid.columns[7].setHidden(true);

            }
            else if(wizardPnl.down('gmpproductslinkagedetailswingrid')){
                productLinesGrid = wizardPnl.down('gmpproductslinkagedetailswingrid');
                productLinesGrid.columns[4].setHidden(true);
                productLinesGrid.columns[5].setHidden(true);
                productLinesGrid.columns[6].setHidden(true);
                productLinesGrid.columns[7].setHidden(true);
            }
          
        }
        if (sub_module_id == 40 || sub_module_id === 40) {
            wizardPnl.down('gmpvariationrequestsgrid').down('hiddenfield[name=isReadOnly]').setValue(siteReadOnly);
        }
        Ext.Ajax.request({
            method: 'GET',
            url: 'gmpapplications/getGmpApplicationMoreDetails',
            params: {
                application_id: application_id,
                site_id: site_id,
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
                    siteDetails = resp.site_details,
                    ltrDetails = resp.ltr_details,
                    contactPersonDetails = resp.contact_details;
                if (success == true || success === true) {
                    if (applicantDetails) {
                        var model1 = Ext.create('Ext.data.Model', applicantDetails);
                        applicantFrm.loadRecord(model1);
                    }
                    if (siteDetails) {
                        assessmentType_fld.setValue(siteDetails.assessment_type_id);
                        gmpType_fld.setValue(siteDetails.gmp_type_id);
                        deviceType_fld.setValue(siteDetails.device_type_id);
                        var model2 = Ext.create('Ext.data.Model', siteDetails);
                        siteFrm.loadRecord(model2);
                    }
                    if (ltrDetails) {
                        var model3 = Ext.create('Ext.data.Model', ltrDetails);
                        ltrFrm.loadRecord(model3);
                    }
                    if (contactPersonDetails) {
                        var model4 = Ext.create('Ext.data.Model', contactPersonDetails);
                        contactPersonFrm.loadRecord(model4);
                    }
                    funcShowCustomizableWindow('Preview GMP Inspection Application '+ref_no, '85%', wizardPnl, 'customizablewindow');
                    if (sub_module_id == 6 || sub_module_id === 6) {
                        if (isReadOnly < 1) {
                            siteFrm.getForm().getFields().each(function (field) {
                                field.setReadOnly(true);
                            });
                            personnelDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
                            otherDetailsGrid.down('hiddenfield[name=isReadOnly]').setValue(0);
                            me.fireEvent('formAuth', process_id, 1, siteFrm);
                            me.fireEvent('gmpOtherPartsAuth', process_id, wizardPnl);
                        }
                    }

                    wizardPnl.add({xtype:'applicationqueriesgrid',title: 'Request for Additional Information(Queries)'});
                    queries_panel = wizardPnl.down('applicationqueriesgrid');
                    queries_panel.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    queries_panel.down('hiddenfield[name=application_code]').setValue(application_code);
                    queries_panel.down('hiddenfield[name=module_id]').setValue(module_id);
                    queries_panel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    queries_panel.down('hiddenfield[name=section_id]').setValue(section_id);
              
                   wizardPnl.add({xtype:'previewproductDocUploadsGrid',title: 'Application Uploaded Documents (All)'});


                    documents_grid = wizardPnl.down('previewproductDocUploadsGrid');
                    documents_grid.down('hiddenfield[name=process_id]').setValue(process_id);
                    documents_grid.down('hiddenfield[name=section_id]').setValue(section_id);
                    documents_grid.down('hiddenfield[name=module_id]').setValue(module_id);
                    documents_grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                    documents_grid.down('hiddenfield[name=application_code]').setValue(application_code);
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

    getLtrDetails: function (ltr_id, ltrForm) {
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getApplicantsList',
            params: {
                applicant_id: ltr_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results[0],
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    ltrForm.loadRecord(model);
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    redoManSiteOtherDetailsGrid: function (grid) {
        var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            add_btn = grid.down('button[name=add_details]'),
            widgetCol = grid.columns[grid.columns.length - 1];
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            add_btn.setVisible(false);
            widgetCol.setHidden(true);
            widgetCol.widget.menu.items = [];
        } else {
            add_btn.setVisible(true);
            widgetCol.setHidden(false);
            widgetCol.widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                action: 'edit',
                childXtype: 'premiseotherdetailsfrm',
                winTitle: 'Premise Other Details',
                winWidth: '35%',
                handler: 'showEditPremiseRegParamWinFrm',
                stores: '[]'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                table_name: 'tra_premises_otherdetails',
                storeID: 'premiseotherdetailsstr',
                action_url: 'premiseregistration/deletePremiseRegRecord',
                action: 'actual_delete',
                handler: 'doDeletePremiseRegWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }
            ];
        }
    },

    redoManSitePersonnelDetailsGrid: function (grid) {
        var isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
            add_btn = grid.down('button[name=add_personnel]'),
            widgetCol = grid.columns[grid.columns.length - 1];
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            add_btn.setVisible(false);
            grid.columns[grid.columns.length - 1].widget.menu.items = [
                {
                    text: 'Personnel Details',
                    iconCls: 'x-fa fa-user',
                    winTitle: 'Premise Personnel Details',
                    childXtype: 'personneldetailstabpnl',
                    winWidth: '60%',
                    handler: 'showEditPremisePersonnelDetails',
                    stores: '[]'
                }];
        } else {
            add_btn.setVisible(true);
            widgetCol.widget.menu.items = [{
                text: 'Personnel Details',
                iconCls: 'x-fa fa-user',
                winTitle: 'Premise Personnel Details',
                childXtype: 'personneldetailstabpnl',
                winWidth: '60%',
                handler: 'showEditPremisePersonnelDetails',
                stores: '[]'
            }, {
                text: 'Remove',
                iconCls: 'x-fa fa-remove',
                table_name: 'tra_premises_personnel',
                storeID: 'premisepersonneldetailsstr',
                action_url: 'premiseregistration/deletePremiseRegRecord',
                action: 'actual_delete',
                handler: 'doDeletePremiseRegWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }
            ];
        }
    },

    showGmpInspectionSchedulesBtn: function (btn) {
        var childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('button[name=submit_selected]').setVisible(false);
        childObject.columns[childObject.columns.length - 1].setHidden(false);
        childObject.columns[childObject.columns.length - 2].setHidden(false);
        childObject.columns[childObject.columns.length - 3].setHidden(false);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showProductsSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeID = btn.storeID,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            site_id = activeTab.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue(),
            reg_site_id = activeTab.down('mansitedetailsfrm').down('hiddenfield[name=registered_manufacturing_site_id]').getValue(),
            man_site_id = activeTab.down('hiddenfield[name=man_site_id]').getValue(),
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=man_site_id]').setValue(man_site_id);
        childObject.down('hiddenfield[name=reg_site_id]').setValue(reg_site_id);
        childObject.down('button[name=add_selected]').storeID = storeID;
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showProductsSelectionListWin: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            storeID = btn.storeID,
            win = btn.up('window'),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            site_id = win.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue(),
            reg_site_id = win.down('mansitedetailsfrm').down('hiddenfield[name=registered_manufacturing_site_id]').getValue(),
            man_site_id = win.down('hiddenfield[name=man_site_id]').getValue(),
            childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(site_id);
        childObject.down('hiddenfield[name=man_site_id]').setValue(man_site_id);
        childObject.down('hiddenfield[name=reg_site_id]').setValue(reg_site_id);
        childObject.down('button[name=add_selected]').storeID = storeID;
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    addGmpProductLinkageDetails1: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            manufacturing_site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
            store = Ext.getStore(btn.storeID),
            sm = grid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [],
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: grid
                }
            );
        mask.show();
        Ext.each(records, function (record) {
            var product_id = record.get('product_id');
            if (product_id) {
                selected.push(product_id);
            }
        });
        Ext.Ajax.request({
            url: 'gmpapplications/saveGmpProductInfoLinkage',
            jsonData: selected,
            params: {
                manufacturing_site_id: manufacturing_site_id
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
                if (success == true || success === true) {
                    store.load();
                    win.close();
                    toastr.success(message, 'Success Response');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    addGmpProductLinkageDetails: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(btn.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            manufacturing_site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue();
        childObject.down('hiddenfield[name=manufacturing_site_id]').setValue(manufacturing_site_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showManufacturingSitesSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            gmp_type_id = 0;
        if (module_id == 3 || module_id === 3) {//GMP
            if (sub_module_id == 5 || sub_module_id === 5) {//New
                childXtype = 'mansitesselectiongrid';
                gmp_type_id = activeTab.down('hiddenfield[name=gmp_type_id]').getValue();
            } else {
                childXtype = 'manufacturingsitesselectiongrid';
            }
            /* if (sub_module_id == 6 || sub_module_id === 6 || sub_module_id == 39 || sub_module_id === 39) {//Renewal,Cancellation
                 childXtype = 'manufacturingsitesselectiongrid';
             }*/
        }

        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    onManSiteSelectionListDblClick: function (view, record, item, index, e, eOpts) {//New applications
        var me = this,
            grid = view.grid,
            premise_id = record.get('premise_id'),
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();
            if(activeTab.down('mansitedetailsfrm')){
               var manSiteForm = activeTab.down('mansitedetailsfrm');

            }else{
                var pnl_wizard = me.getMansiteappmoredetailswizard();

                manSiteForm = pnl_wizard.down('mansitedetailsfrm');
            }
                 
           // applicantForm = activeTab.down('applicantdetailsfrm'),
            //contactPersonFrm,
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        manSiteForm.loadRecord(record);
        //applicantForm.loadRecord(record);
        //activeTab.down('premiseotherdetailsgrid').getStore().load();
        //activeTab.down('premisepersonneldetailsgrid').getStore().load();
        //me.getPremiseContactPersonDetails(premise_id, contactPersonFrm);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    onManufacturingSiteSelectionListDblClick: function (view, record, item, index, e, eOpts) {//Renewals etc
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            productLineGrid = activeTab.down('productlinedetailsgrid'),
            gmpProductsGrid = activeTab.down('gmpproductslinkagedetailsgrid'),
            otherPersonnelGrid = activeTab.down('mansitepersonneldetailsgrid'),
            blocksGrid = activeTab.down('mansiteblockdetailsgrid'),
            businessDetailsGrid = activeTab.down('mansiteotherdetailsgrid'),
            gmp_type_id = record.get('gmp_type_id'),
            gmp_type_txt = record.get('gmp_type_txt'),
            /* ltr_id = record.get('ltr_id'),
             manufacturing_site_id = record.get('manufacturing_site_id'),
             applicant_id = record.get('applicant_id'),*/
            manSiteForm = activeTab.down('mansitedetailsfrm'),
            applicantForm = activeTab.down('applicantdetailsfrm'),
            ltrForm = activeTab.down('ltrfrm'),
            contactPersonForm = activeTab.down('premisecontactpersonfrm'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        mask.show();
        //activeTab.down('hiddenfield[name=manufacturing_site_id]').setValue(manufacturing_site_id);
        //activeTab.down('hiddenfield[name=applicant_id]').setValue(applicant_id);
        manSiteForm.loadRecord(record);
        applicantForm.loadRecord(record);
        ltrForm.loadRecord(record);
        contactPersonForm.loadRecord(record);
        //this.getLtrDetails(ltr_id, ltrForm);
        activeTab.down('combo[name=gmp_type_id]').setValue(record.get('gmp_type_id'));
        activeTab.down('combo[name=device_type_id]').setValue(record.get('device_type_id'));
        activeTab.down('combo[name=assessment_type_id]').setValue(record.get('assessment_type_id'));
        if (sub_module_id == 6 || sub_module_id === 6) {//Renewal
            activeTab.down('hiddenfield[name=gmp_type_id]').setValue(gmp_type_id);
            activeTab.down('displayfield[name=gmp_type_txt]').setValue(gmp_type_txt);
            if (gmp_type_id == 1 || gmp_type_id === 1) {//Oversea
                me.fireEvent('formAuth', process_id, 1, manSiteForm);
            }
        }
        Ext.Function.defer(function () {
            productLineGrid.getStore().load();
            otherPersonnelGrid.getStore().load();
            blocksGrid.getStore().load();
            businessDetailsGrid.getStore().load();
            gmpProductsGrid.getStore().load();
            mask.hide();
            win.close();
        }, 200);
    },

    showGmpInspectionSchedules: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            is_assign = btn.is_assign,
            winWidth = btn.winWidth;
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        if (is_assign == 1) {
            childObject.down('button[name=sync_btn]').setVisible(true);
        }
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    addGmpApplicationIntoInspectionSchedule: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            apps_grid = activeTab.down('gmpinspectionschedulingphysicalgrid'),
            apps_sm = apps_grid.getSelectionModel(),
            app_records = apps_sm.getSelection(),
            grid = btn.up('grid'),
            win = grid.up('window'),
            sm = grid.getSelectionModel(),
            record = sm.getSelection(),
            inspection_id = record[0].get('id'),
            selected = [],
            //application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            //application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            mask = new Ext.LoadMask(
                {
                    msg: 'Please wait...',
                    target: win
                }
            );
        mask.show();
        Ext.each(app_records, function (app_record) {
            var application_code = app_record.get('application_code');
            if (application_code) {
                selected.push(application_code);
            }
        });
        Ext.Ajax.request({
            url: 'gmpapplications/addGmpApplicationIntoInspectionSchedule',
            jsonData: selected,
            params: {
                inspection_id: inspection_id
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
                if (success == true || success === true) {
                    toastr.success(message, 'Success Response');
                    win.close();
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                mask.hide();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mask.hide();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    saveTCMeetingDetails: function (btn) {
        this.fireEvent('saveTCMeetingDetails', btn);
    },

    getApplicationApprovalDetails: function (btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            table_name = btn.table_name,
            form = Ext.widget('gmpapprovalrecommendationfrm'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getApplicationApprovalDetails',
            params: {
                application_id: application_id,
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
                    results = resp.results,
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    form.loadRecord(model);
                    form.down('hiddenfield[name=application_id]').setValue(application_id);
                    form.down('hiddenfield[name=application_code]').setValue(application_code);
                    form.down('hiddenfield[name=process_id]').setValue(process_id);
                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowCustomizableWindow('Recommendation', '40%', form, 'customizablewindow');
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

    saveDeskReviewScheduleDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            toaster = btn.toaster,
            frm = form.getForm(),
            applicationsGrid = btn.up('grid'),
            sm = applicationsGrid.getSelectionModel(),
            selected_records = sm.getSelection(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            selected = [];
        Ext.each(selected_records, function (item) {
            selected.push(item.data.application_code);
        });
        if (frm.isValid()) {
            if (!sm.hasSelection()) {
                toastr.warning('Please select at least one application!!', 'Warning Response');
                return false;
            }
            frm.submit({
                url: 'gmpapplications/saveGmpDeskReviewScheduleDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_code: application_code,
                    selected: JSON.stringify(selected),
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
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
            return false;
        }
    },

    showAddInspectionOtherDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            childXtype = btn.childXtype,
            childObject = Ext.widget(childXtype),
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            grid = btn.up('grid'),
            inspection_id = activeTab.down('form').down('hiddenfield[name=id]').getValue();
        if (!inspection_id) {
            toastr.warning('Please save inspection team details first!!', 'Warning Response');
            return;
        }
        childObject.down('hiddenfield[name=inspection_id]').setValue(inspection_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
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
            static_stage = getGmpModuleStaticStage(sub_module_id, section_id, target_stage);
        this.fireEvent('showPrevUploadedDocsWin', btn, section_id, module_id, sub_module_id, static_stage, application_code);
    },


    showAddGmpWithdrawalReason: function (btn) {
        var me = this,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            title = btn.winTitle,
            childObject = Ext.widget(btn.childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        childObject.down('hiddenfield[name=application_code]').setValue(application_code);
        if (!application_id) {
            toastr.warning('Please save application first!!', 'Warning Response');
            return false;
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(title, winWidth, childObject, 'customizablewindow');
    }

});